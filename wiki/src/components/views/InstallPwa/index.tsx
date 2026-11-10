import { Tabs } from "antd"

const InstallPwa = () => {
  return (
    <div>
      <Tabs
        destroyOnHidden
        defaultActiveKey="account"
        items={[
          {
            key: "info",
            label: <strong>Desktop Installation</strong>,
            children: (
              <div>
                <h5 className="mb-3">Windows / macOS (Google Chrome, Edge)</h5>
                <ul className="mb-8 list-inside list-disc text-gray-500">
                  <li>Open the website you want to install as a PWA in Google Chrome or Microsoft Edge.</li>
                  <li>
                    Look for the "Install" icon in the address bar (a small computer icon with a plus sign{" "}
                    <code>+</code>).
                  </li>
                  <li>Click "Install" when prompted.</li>
                  <li>The app will now appear in your Start Menu (Windows) or Applications folder (Mac).</li>
                </ul>
                <div className="mb-3">
                  <strong>Alternative Method:</strong>
                </div>
                <ul className="mb-8 list-inside list-disc text-gray-500">
                  <li>
                    Click the three-dot menu (<code>⋮</code> in Chrome, <code>...</code> in Edge).
                  </li>
                  <li>Select "Install App" or "Apps" → "Install this site as an app".</li>
                </ul>
                <h5 className="mb-3">Windows / macOS (Mozilla Firefox)</h5>
                <ul className="mb-10 list-inside list-disc text-gray-500">
                  <li>Open the website in Firefox.</li>
                  <li>
                    Click the three-line menu (<code>☰</code>) in the top right.
                  </li>
                  <li>Select "More tools" → "Add to Desktop" (on Windows).</li>
                  <li>Check "Open as Window" and click "Add".</li>
                  <li>The app will appear on your Desktop and in the Start Menu.</li>
                </ul>
                <h5 className="mb-3">macOS (Safari)</h5>
                <ul className="mb-10 list-inside list-disc text-gray-500">
                  <li>Open the website in Safari.</li>
                  <li>Click File → Add to Dock.</li>
                  <li>Set a name and click Add.</li>
                  <li>The app will now be available in the Dock.</li>
                </ul>
              </div>
            ),
          },
          {
            key: "settings",
            label: <strong>Mobile Installation</strong>,
            children: (
              <div>
                <h5 className="mb-3">Android (Google Chrome, Edge, Samsung Internet)</h5>
                <ul className="mb-8 list-inside list-disc text-gray-500">
                  <li>Open the website in Google Chrome, Microsoft Edge, or Samsung Internet.</li>
                  <li>
                    Tap the three-dot menu (<code>⋮</code> in Chrome, <code>...</code> in Edge).
                  </li>
                  <li>Select "Install App" or "Add to Home Screen".</li>
                  <li>Confirm by tapping "Add".</li>
                  <li>The app will now appear on your home screen like a regular app.</li>
                </ul>
                <h5 className="mb-3">Android (Firefox)</h5>
                <ul className="mb-8 list-inside list-disc text-gray-500">
                  <li>Open the website in Firefox.</li>
                  <li>
                    Tap the three-dot menu (<code>⋮</code>).
                  </li>
                  <li>Select "Add to Home Screen".</li>
                  <li>Confirm by tapping "Add".</li>
                </ul>
                <h5 className="mb-3">iPhone / iPad (Safari)</h5>
                <ul className="mb-8 list-inside list-disc text-gray-500">
                  <li>Open the website in Safari.</li>
                  <li>Tap the Share button (square with an arrow).</li>
                  <li>Scroll down and tap "Add to Home Screen".</li>
                  <li>Rename the app (optional) and tap "Add".</li>
                  <li>The app will now appear on your home screen.</li>
                </ul>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

export default InstallPwa
