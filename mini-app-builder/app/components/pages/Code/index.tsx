import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { Alert, Button, Input, Space, Tabs } from "antd"
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import style from "./style.module.css"
import { platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import {
  forwardToHost,
  forwardToMiniApp,
  getBridgeMessageLabel,
  hostOrigin,
  subscribeToMiniAppBridge,
  urlOrigin,
} from "@/integrations/xray-js/miniAppBridge"
import { useProjectsStore } from "@/store/projects"
import { resolveProject } from "@/store/projects/persistence"
import { miniAppRoute, projectRoute } from "@/store/projects/routes"
import type { Project } from "@/store/projects/types"
import { usePreferencesStore } from "@/store/preferences"
import ProjectStorageNotice from "@/components/common/ProjectStorageNotice"
import Copy from "@/components/common/Copy"
import EventLog from "./EventLog"
import type { EventLogEntry } from "./types"
import { CONNECTION_WAIT_MS, MAX_EVENTS, connectionLabel, initialPreviewState, previewReducer } from "./session"

function LocalPreview({ project, onReload }: { project: Project; onReload: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const route = miniAppRoute(location.pathname, location.search, location.hash)
  const upstream = platformV1.useStatus()
  const account = upstream.data?.host === "xray.app" ? upstream.data.account : null
  const blockchain = account?.blockchain
  const network = account?.network
  const [session, dispatch] = useReducer(previewReducer, undefined, initialPreviewState)
  const [inputRoute, setInputRoute] = useState(route)
  const [events, setEvents] = useState<EventLogEntry[]>([])
  const [paused, setPaused] = useState(false)
  const [loadGeneration, setLoadGeneration] = useState(0)
  const { hideEventLog, setHideEventLog } = usePreferencesStore()
  const [activeTab, setActiveTab] = useState("app")
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const embedded = typeof window !== "undefined" && window.parent !== window
  const origin = urlOrigin(project.url)
  const current = useRef({ route, paused, navigate, slug: project.slug })
  current.current = { route, paused, navigate, slug: project.slug }
  useEffect(() => setInputRoute(route), [route])

  useLayoutEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    let loads = 0
    let waitTimer: ReturnType<typeof setTimeout>
    const wait = () => {
      clearTimeout(waitTimer)
      waitTimer = setTimeout(() => dispatch("timeout"), CONNECTION_WAIT_MS)
    }
    const log = (direction: EventLogEntry["direction"], type: string, payload: unknown) => {
      if (current.current.paused) return
      setEvents((events) =>
        [{ id: crypto.randomUUID(), direction, type, payload, timestamp: Date.now() }, ...events].slice(0, MAX_EVENTS)
      )
    }
    const bridge = subscribeToMiniAppBridge({
      iframe: iframe.contentWindow,
      previewOrigin: origin,
      hostOrigin: hostOrigin(),
      onStatusResult: (connected) => dispatch(connected ? "connected" : "unavailable"),
      onClientMessage: (message) => {
        dispatch("sdk")
        log("client", getBridgeMessageLabel(message), message.payload)
        if (message.scope === "platform" && message.method === "routeChanged") {
          const next = projectRoute(current.current.slug, message.payload as string)
          if (next !== projectRoute(current.current.slug, current.current.route)) void current.current.navigate(next)
        } else forwardToHost(message)
      },
      onHostMessage: (message) => {
        // HostRouteSync handles Builder navigation; the effect below sends the preview route.
        if (message.type === "xray.bridge.event" && message.scope === "platform" && message.event === "routeChanged")
          return
        forwardToMiniApp(iframe.contentWindow, message, origin)
        log("host", getBridgeMessageLabel(message), "payload" in message ? message.payload : message)
      },
    })
    const onLoad = () => {
      // First-load SDK requests may precede load. Later navigations invalidate all old correlation.
      if (loads++ > 0) {
        bridge.reset()
        dispatch("reset")
        wait()
      }
      dispatch("loaded")
      setLoadGeneration((value) => value + 1)
    }
    iframe.addEventListener("load", onLoad)
    wait()
    iframe.src = project.url
    return () => {
      clearTimeout(waitTimer)
      bridge()
      iframe.removeEventListener("load", onLoad)
    }
  }, [project.id, project.url, origin])

  const hadHost = useRef(false)
  useEffect(() => {
    const available = upstream.data?.host === "xray.app"
    if (hadHost.current && !available) dispatch("unavailable")
    hadHost.current = available
  }, [upstream.data])
  useEffect(() => {
    if (!session.loaded) return
    forwardToMiniApp(
      iframeRef.current?.contentWindow,
      {
        type: "xray.bridge.event",
        scope: "platform",
        version: "v1",
        event: "routeChanged",
        payload: route,
        context: blockchain && network ? { blockchain, network } : null,
      },
      origin
    )
    // SDK status events create new objects even when the account context is unchanged.
  }, [route, session.loaded, loadGeneration, blockchain, network, origin])
  const edit = () => useProjectsStore.getState().modalProjectsSet(true, project.id)
  const closePanel = () => {
    setHideEventLog(true)
    requestAnimationFrame(() => openButtonRef.current?.focus())
  }
  const appControls = (
    <div className={style.appControls}>
      <ProjectStorageNotice />
      <div>
        <span className={style.eyebrow}>Local development</span>
        <h1 className={style.projectName}>{project.name}</h1>
      </div>
      <section className={style.connection} aria-label="Connection status">
        <div role="status" className={style.connectionTitle}>
          <span className={style.statusDot} data-connected={session.connected && embedded} />
          {connectionLabel(session, embedded)}
        </div>
        <dl className={style.statusDetails}>
          <div>
            <dt>Preview</dt>
            <dd>{session.loaded ? "Loaded" : "Loading"}</dd>
          </div>
          <div>
            <dt>SDK</dt>
            <dd>{session.sdkSeen ? "Activity detected" : "Waiting"}</dd>
          </div>
          <div>
            <dt>XRAY host</dt>
            <dd>{upstream.data?.host === "xray.app" ? "Available" : embedded ? "Waiting" : "Unavailable"}</dd>
          </div>
        </dl>
      </section>
      <div>
        <label htmlFor="development-url" className={style.fieldLabel}>
          Development URL
        </label>
        <Space.Compact block size="large" className={style.inputGroup}>
          <Input id="development-url" readOnly value={project.url} title={project.url} />
          <Copy copy={project.url} tooltipMessage="Copy URL" tooltipSuccess="Copied!">
            <Button aria-label="Copy development URL" icon={<DocumentDuplicateIcon className="size-4" />} />
          </Copy>
          <Button
            aria-label="Open externally"
            title="Open externally"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ArrowTopRightOnSquareIcon className="size-4" />}
          />
        </Space.Compact>
      </div>
      <div>
        <label htmlFor="mini-app-route" className={style.fieldLabel}>
          App route
        </label>
        <Space.Compact block size="large" className={style.inputGroup}>
          <Input
            id="mini-app-route"
            aria-label="Mini-app route"
            value={inputRoute}
            onChange={(event) => setInputRoute(event.target.value)}
            onPressEnter={() => void navigate(projectRoute(project.slug, inputRoute))}
          />
          <Button
            aria-label="Reload preview"
            title="Reload preview"
            onClick={onReload}
            icon={<ArrowPathIcon className="size-4" />}
          />
        </Space.Compact>
      </div>
      {session.timedOut && !session.connected && (
        <Alert
          type="warning"
          showIcon
          title="Connection could not be confirmed"
          description="Check your server, XRAY SDK setup, and browser embedding or local-network permissions. Edit the URL or open it externally, then reload the preview."
        />
      )}
    </div>
  )
  return (
    <div className={style.workspace}>
      <iframe title="Mini-app preview" ref={iframeRef} allow="local-network-access" className={style.preview} />
      <div className={style.floatingActions} hidden={!hideEventLog}>
        <Button
          ref={openButtonRef}
          shape="round"
          size="large"
          aria-label="Open tools"
          aria-expanded={!hideEventLog}
          aria-controls="preview-controls"
          icon={<Cog6ToothIcon className="size-5" />}
          onClick={() => {
            setHideEventLog(false)
            requestAnimationFrame(() => closeButtonRef.current?.focus())
          }}
        >
          Console
        </Button>
        <Button
          shape="round"
          size="large"
          danger
          onClick={() => void navigate("/")}
          icon={<XMarkIcon className="size-5" />}
        >
          Close
        </Button>
      </div>
      <aside
        id="preview-controls"
        aria-label="Tools"
        className={style.panel}
        hidden={hideEventLog}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation()
            closePanel()
          }
        }}
      >
        <div className={style.panelHeader}>
          <Button
            type="text"
            shape="round"
            className={style.backButton}
            onClick={() => void navigate("/")}
            icon={<ArrowLeftIcon className="size-4" />}
          >
            Back to Projects
          </Button>
          <Button
            ref={closeButtonRef}
            shape="circle"
            type="text"
            aria-label="Close tools"
            onClick={closePanel}
            icon={<XMarkIcon className="size-5" />}
          />
        </div>
        <Tabs
          animated={false}
          className={style.tabs}
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarExtraContent={
            <Button
              type="text"
              shape="round"
              size="small"
              onClick={edit}
              icon={<PencilSquareIcon className="size-4" />}
            >
              Edit
            </Button>
          }
          items={[
            { key: "app", label: "App", children: appControls },
            {
              key: "events",
              label: "Event Log",
              forceRender: true,
              children: (
                <EventLog eventsList={events} setEventsList={setEvents} paused={paused} onPausedChange={setPaused} />
              ),
            },
          ]}
        />
      </aside>
    </div>
  )
}

export default function Code({ id }: { id: string }) {
  const state = useProjectsStore()
  const location = useLocation()
  const [reload, setReload] = useState(0)
  if (state.hydration === "loading")
    return (
      <p role="status" className="p-6">
        Loading saved projects…
      </p>
    )
  if (state.hydration === "error")
    return (
      <div className="p-6">
        <ProjectStorageNotice />
      </div>
    )
  const project = resolveProject(state, id)
  if (!project)
    return (
      <div className="p-6">
        <h1>Project not found</h1>
        <Link to="/">Back to projects</Link>
      </div>
    )
  if (id !== project.slug)
    return (
      <Navigate
        replace
        to={projectRoute(project.slug, miniAppRoute(location.pathname, location.search, location.hash))}
      />
    )
  return (
    <LocalPreview
      key={`${project.id}:${project.url}:${reload}`}
      project={project}
      onReload={() => setReload((value) => value + 1)}
    />
  )
}
