import { expect, test, type Page } from "@playwright/test"
const key = "xray-mini-app-builder.projects"
async function seed(page: Page, url = "http://127.0.0.1:7212/base/?q=a%2Fb#entry") {
  await page.addInitScript(
    ({ key, url }) => {
      if (location.origin === "http://127.0.0.1:7210" && !sessionStorage.getItem("seeded")) {
        localStorage.setItem(
          key,
          JSON.stringify({
            version: 1,
            state: {
              projects: [
                { name: "First", url },
                { name: "Second", url },
              ],
            },
          })
        )
        sessionStorage.setItem("seeded", "yes")
      }
    },
    { key, url }
  )
}
const builder = (page: Page) => page.frameLocator('iframe[title="Builder"]')
const preview = (page: Page) => builder(page).frameLocator('iframe[title="Mini-app preview"]')
const hostUrl = (route: string, extra = "") => `http://127.0.0.1:7211/?route=${encodeURIComponent(route)}${extra}`

test("creates, validates, edits, reloads, and removes a local project", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "New project" }).click()
  await expect(page.getByRole("radio", { name: "Local development" })).toBeEnabled()
  await expect(page.getByRole("radio", { name: /In-browser/ })).toBeDisabled()
  await page.getByLabel("Project name", { exact: true }).fill("My app")
  await page.getByLabel("Development URL", { exact: true }).fill("javascript:alert(1)")
  await page.getByRole("button", { name: "Create project", exact: true }).click()
  await expect(page.getByText("Use HTTP or HTTPS without")).toBeVisible()
  await expect(page.getByText("Use only letters (a-z, A-Z), numbers, and hyphens (-).")).toBeVisible()
  await page.getByLabel("Project name", { exact: true }).fill("My-app")
  await page.getByLabel("Development URL", { exact: true }).fill("http://127.0.0.1:7212/")
  await page.getByRole("button", { name: "Create project", exact: true }).click()
  const link = page.getByRole("link", { name: "My-app", exact: true })
  const href = await link.getAttribute("href")
  expect(href).toBe("/code/My-app/")
  const internalId = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).state.projects[0].id, key)
  await page.getByRole("button", { name: "Edit", exact: true }).click()
  await expect(page.getByRole("radio", { name: "Local development" })).toBeDisabled()
  await expect(page.getByRole("radio", { name: /In-browser/ })).toBeDisabled()
  await page.getByLabel("Project name", { exact: true }).fill("Renamed-app")
  await page.getByRole("button", { name: "Save changes" }).click()
  await page.reload()
  await expect(page.getByRole("link", { name: "Renamed-app", exact: true })).toHaveAttribute(
    "href",
    "/code/Renamed-app/"
  )
  await page.goto(`/code/${internalId}/deep?q=a%2Fb#tab`)
  await expect(page).toHaveURL(/\/code\/Renamed-app\/deep\?q=a%2Fb#tab$/)
  await page.goto("/")
  await page.getByRole("button", { name: "Remove", exact: true }).click()
  await page.getByRole("button", { name: "Remove", exact: true }).last().click()
  await page.goto("/code/Renamed-app/")
  await expect(page.getByText("Project not found", { exact: true })).toBeVisible()
})

test("migrates numeric links once and never retargets them after deletion", async ({ page }) => {
  await seed(page)
  await page.goto("/code/1/deep/a%2Fb?x=%2F#tab")
  await expect(page).toHaveURL(/\/code\/Second\/deep\/a%2Fb\?x=%2F#tab/)
  const stable = page.url()
  await expect(page.getByRole("heading", { name: "Second", exact: true })).toBeVisible()
  await page.goto("/")
  await page
    .getByRole("article")
    .filter({ has: page.getByRole("heading", { name: "First", exact: true }) })
    .getByRole("button", { name: "Remove" })
    .click()
  await page.getByRole("button", { name: "Remove", exact: true }).last().click()
  await page.goto("/code/1/deep/a%2Fb?x=%2F#tab")
  await expect(page).toHaveURL(stable)
  await page.goto("/code/0/")
  await expect(page.getByText("Project not found", { exact: true })).toBeVisible()
  const storage = await page.evaluate(
    (key) => ({ data: JSON.parse(localStorage.getItem(key)!), backup: localStorage.getItem(key + ".recovery-v1") }),
    key
  )
  expect(storage.backup).toContain('"First"')
  expect(Object.keys(storage.data.state).sort()).toEqual(["legacyAliases", "projects", "recoveredEntries"])
})

test("shows recoverable storage errors instead of an empty project list", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, "{broken"), key)
  await page.goto("/code/0/")
  await expect(page.getByText("Projects could not be saved or loaded")).toBeVisible()
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe("{broken")
})

test("connects through the nested relay and preserves routing and Cardano scope", async ({ page }, testInfo) => {
  await seed(page)
  await page.goto(hostUrl("/code/1/start?x=1#tab"))
  const app = builder(page)
  await expect(app.getByText("Connected to XRAY", { exact: true })).toBeVisible()
  await expect(preview(page).locator("#app-route")).toHaveText("/start?x=1#tab")
  await page.screenshot({ path: testInfo.outputPath("desktop-app.png"), fullPage: true, animations: "disabled" })
  await preview(page).getByRole("button", { name: "Request Cardano tip" }).click()
  await expect(preview(page).locator("#tip-result")).toContainText('"absSlot":123')
  await preview(page).getByRole("button", { name: "App navigate" }).click()
  await expect(app.getByLabel("Mini-app route")).toHaveValue("/from-app?x=a%2Fb#tab")
  await expect(page.locator("#host-route")).toHaveText(/\/code\/Second\/from-app\?x=a%2Fb#tab/)
  await app.getByLabel("Mini-app route").fill("/typed?z=2#end")
  await app.getByLabel("Mini-app route").press("Enter")
  await expect(preview(page).locator("#app-route")).toHaveText("/typed?z=2#end")
  await page.evaluate(() => history.back())
  await expect(app.getByLabel("Mini-app route")).toHaveValue("/from-app?x=a%2Fb#tab")
  await page.evaluate(() => history.forward())
  await expect(app.getByLabel("Mini-app route")).toHaveValue("/typed?z=2#end")
  await app.getByRole("button", { name: "Reload preview", exact: true }).click()
  await expect(app.getByText("Connected to XRAY", { exact: true })).toBeVisible()
  await expect(preview(page).locator("#app-route")).toHaveText("/typed?z=2#end")
  await preview(page).getByRole("button", { name: "Reload document" }).click()
  await expect(preview(page).locator("#app-route")).toHaveText("/typed?z=2#end")
  await expect(app.getByText("Connected to XRAY", { exact: true })).toBeVisible()
})

test("logs preview platform requests while keeping Builder platform traffic private", async ({ page }) => {
  await seed(page, "http://127.0.0.1:7212/?silent")
  await page.goto(hostUrl("/code/Second/start", `&next=${encodeURIComponent("/code/Second/from-host")}`))
  const app = builder(page)
  await expect(app.getByText("Available", { exact: true })).toBeVisible()
  await expect(preview(page).locator("#app-route")).toHaveText("/start")
  await app.getByRole("tab", { name: "Event Log", exact: true }).click()
  await expect(app.getByText("Event Log (0)", { exact: true })).toBeVisible()

  await page.getByRole("button", { name: "Host navigate" }).click()
  await expect(preview(page).locator("#app-route")).toHaveText("/from-host")
  await expect(app.getByText("Event Log (0)", { exact: true })).toBeVisible()

  await preview(page).getByRole("button", { name: "Ask XRAY status" }).click()
  await expect(preview(page).locator("#result")).toContainText('"host":"xray.app"')
  await expect(app.getByText("Event Log (2)", { exact: true })).toBeVisible()
  await expect(app.getByRole("button", { name: /platform\/v1.getStatus/ })).toHaveCount(2)
})

test("project switches and URL edits start fresh preview sessions", async ({ page }) => {
  await seed(page)
  await page.goto(hostUrl("/code/0/", `&next=${encodeURIComponent("/code/1/switched")}`))
  const app = builder(page)
  await expect(app.getByText("Connected to XRAY", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Host navigate" }).click()
  await expect(app.getByRole("heading", { name: "Second", exact: true })).toBeVisible()
  await expect(preview(page).locator("#app-route")).toHaveText("/switched")
  await app.getByRole("button", { name: "Edit", exact: true }).click()
  await app.getByRole("dialog").getByLabel("Development URL", { exact: true }).fill("http://127.0.0.1:7212/?silent")
  await app.getByRole("button", { name: "Save changes" }).click()
  await expect(app.getByText("Waiting for SDK activity", { exact: true })).toBeVisible()
  await expect(app.getByText("Connected to XRAY", { exact: true })).toHaveCount(0)
  await preview(page).getByRole("button", { name: "Ask XRAY status" }).click()
  await expect(app.getByText("Connected to XRAY", { exact: true })).toBeVisible()
  await app.getByRole("button", { name: "Edit", exact: true }).click()
  await app.getByRole("dialog").getByLabel("Project name", { exact: true }).fill("Second-renamed")
  await app.getByRole("button", { name: "Save changes" }).click()
  await expect(app.getByRole("heading", { name: "Second-renamed", exact: true })).toBeVisible()
  await expect(app.getByLabel("Mini-app route")).toHaveValue("/switched")
  await expect(page.locator("#host-route")).toHaveText("/code/Second-renamed/switched")
  await preview(page).getByRole("button", { name: "App navigate" }).click()
  await expect(page.locator("#host-route")).toHaveText("/code/Second-renamed/from-app?x=a%2Fb#tab")
})

test("mobile preview supports keyboard routing and event controls", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await seed(page)
  await page.goto("/code/0/")
  const panel = page.getByRole("complementary", { name: "Tools" })
  await expect(panel).toBeVisible()
  await expect(page.getByRole("button", { name: "Close", exact: true })).not.toBeVisible()
  await expect(page.getByRole("button", { name: "Back to Projects" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Edit", exact: true })).toBeVisible()
  await expect(page.getByRole("link", { name: "Open externally" })).toHaveAttribute(
    "href",
    "http://127.0.0.1:7212/base/?q=a%2Fb#entry"
  )
  await expect(page.getByRole("tab", { name: "App", exact: true })).toHaveAttribute("aria-selected", "true")
  await page.getByLabel("Mini-app route").fill("/keyboard?q=1#end")
  await page.getByLabel("Mini-app route").press("Enter")
  await expect(page).toHaveURL(/\/keyboard\?q=1#end$/)
  await page.screenshot({ path: testInfo.outputPath("mobile-app.png"), fullPage: true, animations: "disabled" })
  await page.getByRole("tab", { name: "Event Log", exact: true }).click()
  await expect(page.getByRole("checkbox", { name: "Pause" })).toBeVisible()
  await page.getByRole("checkbox", { name: "Pause" }).focus()
  await page.keyboard.press("Space")
  await expect(page.getByRole("checkbox", { name: "Pause" })).toBeChecked()
  await page.getByRole("button", { name: "Clear", exact: true }).focus()
  await page.keyboard.press("Enter")
  await expect(page.getByText("Event Log (0)", { exact: true })).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(panel).not.toBeVisible()
  const opener = page.getByRole("button", { name: "Open tools" })
  await expect(opener).toBeFocused()
  await expect(page.getByRole("button", { name: "Close", exact: true })).toBeVisible()
  await expect(page.getByRole("button", { name: "Reload preview" })).not.toBeVisible()
  const frameBounds = await page.locator('iframe[title="Mini-app preview"]').boundingBox()
  expect(frameBounds!.height).toBeGreaterThan(800)
  await page.screenshot({ path: testInfo.outputPath("mobile-preview.png"), fullPage: true, animations: "disabled" })
  await opener.press("Enter")
  await expect(page.getByRole("checkbox", { name: "Pause" })).toBeChecked()
  await page.getByRole("button", { name: "Close tools" }).click()
  await expect(panel).not.toBeVisible()
})

test("host navigation reaches the selected project without doubled prefixes", async ({ page }) => {
  await seed(page)
  await page.goto(hostUrl("/code/1/start", `&next=${encodeURIComponent("/code/1/from-host?q=x#end")}`))
  await expect(builder(page).getByText("Connected to XRAY", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Host navigate" }).click()
  await expect(preview(page).locator("#app-route")).toHaveText("/from-host?q=x#end")
  await expect(page.locator("#host-route")).not.toContainText("/code/1/code/")
})

test("status updates only resend the preview route when account context changes", async ({ page }) => {
  await seed(page)
  await page.goto(hostUrl("/code/Second/start"))
  await expect(builder(page).getByText("Connected to XRAY", { exact: true })).toBeVisible()
  const route = preview(page).locator("#app-route")
  await expect(route).toHaveAttribute("data-context", JSON.stringify({ blockchain: "cardano", network: "preview" }))
  const initialCount = Number(await route.getAttribute("data-count"))
  const sendStatus = (network: string) =>
    page.evaluate((network) => {
      document.querySelector("iframe")!.contentWindow!.postMessage(
        {
          type: "xray.bridge.event",
          scope: "platform",
          version: "v1",
          event: "status",
          payload: { host: "xray.app" },
          context: { blockchain: "cardano", network },
        },
        "http://127.0.0.1:7210"
      )
    }, network)
  for (let i = 1; i <= 3; i++) {
    await sendStatus("preview")
    await expect(preview(page).locator("#status-events")).toHaveText(String(i))
  }
  await sendStatus("preprod")
  await expect(route).toHaveAttribute("data-context", JSON.stringify({ blockchain: "cardano", network: "preprod" }))
  await expect(route).toHaveAttribute("data-count", String(initialCount + 1))
  await expect(route).toHaveText("/start")
})

test("event log rerenders preserve pending requests, pause, and the event limit", async ({ page }, testInfo) => {
  await seed(page)
  await page.goto(hostUrl("/code/0/", "&delay=1500"))
  const app = builder(page)
  await expect(app.getByText("SDK detected · Waiting for XRAY", { exact: true })).toBeVisible()
  await app.getByRole("tab", { name: "Event Log", exact: true }).click()
  await app.getByRole("checkbox", { name: "Pause" }).check()
  await app.getByRole("button", { name: "Close tools" }).click()
  await expect(preview(page).locator("#result")).toContainText('"host":"xray.app"')
  await app.getByRole("button", { name: "Open tools" }).click()
  await app.getByRole("tab", { name: "App", exact: true }).click()
  await expect(app.getByText("Connected to XRAY", { exact: true })).toBeVisible()
  await app.getByRole("tab", { name: "Event Log", exact: true }).click()
  await app.getByRole("checkbox", { name: "Pause" }).uncheck()
  await preview(page).getByRole("button", { name: "Send many events" }).click()
  await expect(app.getByText("Event Log (200)", { exact: true })).toBeVisible()
  await app
    .getByRole("button", { name: /platform\/v1.routeChanged/ })
    .first()
    .click()
  await expect(app.getByRole("button", { name: "Copy payload" })).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath("desktop-events.png"), fullPage: true, animations: "disabled" })
  const entries = app.getByRole("region", { name: "Event log entries" })
  await entries.evaluate((element) => {
    element.scrollTop = element.scrollHeight
  })
  expect(await entries.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  await expect(app.getByRole("checkbox", { name: "Pause" })).toBeInViewport()
  await expect(app.getByRole("button", { name: "Clear", exact: true })).toBeInViewport()
  await expect(app.getByRole("tab", { name: "Event Log", exact: true })).toBeInViewport()
})

test("distinguishes silent previews, timeouts, and recovery", async ({ page }) => {
  await seed(page, "http://127.0.0.1:7212/?silent")
  await page.goto(hostUrl("/code/0/"))
  const app = builder(page)
  await expect(app.getByText("Waiting for SDK activity", { exact: true })).toBeVisible()
  await expect(app.getByText("XRAY connection unavailable", { exact: true })).toBeVisible({ timeout: 15_000 })
  await preview(page).getByRole("button", { name: "Ask XRAY status" }).click()
  await expect(app.getByText("Connected to XRAY", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Fail next status" }).click()
  await preview(page).getByRole("button", { name: "Ask XRAY status" }).click()
  await expect(app.getByText("XRAY connection unavailable", { exact: true })).toBeVisible()
})

test("standalone preview never claims an XRAY connection", async ({ page }) => {
  await seed(page)
  await page.goto("/code/0/")
  await expect(page.getByText("Standalone · XRAY host unavailable", { exact: true })).toBeVisible()
  await expect(page.getByText("Activity detected", { exact: true })).toBeVisible()
  await expect(page.getByText("Connected to XRAY", { exact: true })).toHaveCount(0)
})

test("blocked embedding remains unconfirmed with recovery guidance", async ({ page }) => {
  await seed(page, "http://127.0.0.1:7212/blocked")
  await page.goto(hostUrl("/code/0/"))
  await expect(builder(page).getByText("Connection could not be confirmed")).toBeVisible({ timeout: 15_000 })
  await expect(builder(page).getByRole("link", { name: "Open externally" })).toHaveAttribute(
    "href",
    "http://127.0.0.1:7212/blocked"
  )
})
