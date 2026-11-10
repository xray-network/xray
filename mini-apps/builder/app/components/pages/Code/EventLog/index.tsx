import { useState } from "react"
import { Button, Checkbox } from "antd"
import {
  DocumentDuplicateIcon,
  TrashIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline"
import Copy from "@/components/common/Copy"
import type { EventLogEntry } from "../types"

interface EventLogProps {
  eventsList: EventLogEntry[]
  setEventsList: (events: EventLogEntry[]) => void
  paused: boolean
  onPausedChange: (paused: boolean) => void
}

export default function EventLog({ eventsList, setEventsList, paused, onPausedChange }: EventLogProps) {
  const [openedPayload, setOpenedPayload] = useState<string[]>([])
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden p-6">
      <div className="flex flex-wrap items-center gap-3 pb-5 shrink-0">
        <span className="text-xs text-gray-500 me-auto">Event Log ({eventsList.length})</span>
        <Checkbox checked={paused} onChange={(event) => onPausedChange(event.target.checked)}>
          Pause
        </Checkbox>
        <Button
          shape="round"
          icon={<TrashIcon className="size-4" />}
          onClick={() => {
            setEventsList([])
            setOpenedPayload([])
          }}
        >
          Clear
        </Button>
      </div>
      <div
        role="region"
        aria-label="Event log entries"
        tabIndex={0}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-3"
      >
        {!eventsList.length && (
          <div className="text-center px-4 py-12 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium">No events yet</p>
            <p className="text-xs text-gray-500 mt-2">SDK activity will appear here as you use your app.</p>
          </div>
        )}
        {eventsList.map((event) => {
          const payload = JSON.stringify(
            event.payload,
            (_, value) => (typeof value === "bigint" ? value.toString() : value),
            2
          )
          const expanded = openedPayload.includes(event.id)
          return (
            <div key={event.id}>
              <button
                type="button"
                aria-expanded={expanded}
                className="w-full flex items-start gap-3 p-4 text-left cursor-pointer border border-gray-200 dark:border-gray-800 rounded-2xl aria-expanded:rounded-b-none hover:bg-gray-50 dark:hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-blue-500"
                onClick={() =>
                  setOpenedPayload((ids) => (expanded ? ids.filter((id) => id !== event.id) : [...ids, event.id]))
                }
              >
                <span className="mt-1 shrink-0">
                  {event.direction === "client" ? (
                    <ArrowUpRightIcon className="size-4 text-blue-500" />
                  ) : (
                    <ArrowDownLeftIcon className="size-4 text-green-500" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium break-all">{event.type}</span>
                  <span className="block text-[11px] text-gray-500 mt-1">
                    {event.direction === "client" ? "App → XRAY" : "XRAY → App"} ·{" "}
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </span>
                {expanded ? (
                  <MinusIcon className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
                ) : (
                  <PlusIcon className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
                )}
              </button>
              {expanded && (
                <div className="border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-2xl p-4 bg-gray-50 dark:bg-gray-950">
                  <Copy copy={payload}>
                    <Button shape="round" icon={<DocumentDuplicateIcon className="size-3" />}>
                      Copy payload
                    </Button>
                  </Copy>
                  <pre className="text-[11px] mt-3 overflow-auto">{payload}</pre>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
