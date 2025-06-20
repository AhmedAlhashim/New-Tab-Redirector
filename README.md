```markdown
# New-Tab → http://e/  (JS version)

Turns every brand-new Chrome tab into **`http://e/`** by updating the tab the moment it is created.  
*(No HTML redirect page; everything happens in the background script.)*

---

## 1 Overview
This Manifest V3 extension listens for `chrome.tabs.onCreated`, detects the real **New Tab** page (`chrome://newtab` / `about:blank`), and immediately calls `chrome.tabs.update()` with **`http://e/`**.

* **Two tiny files only** – `manifest.json` + `background.js`
* **Works unpacked** – no Chrome Web Store upload required
* **Fast** – navigation happens before the default page paints  
  *(Chrome transfers focus to the new page once it loads; extensions can’t keep the cursor in the omnibox after navigation.)*

---

## 2 Folder structure

```

new-tab-e/
├─ manifest.json      ← extension metadata & service-worker entry
└─ background.js      ← listens for new-tab events and updates URL

````

### 2.1 `manifest.json`

```json
{
  "name": "New-Tab → http://e/",
  "description": "Loads http://e/ whenever a blank/new tab is opened.",
  "version": "1.0.0",
  "manifest_version": 3,

  "permissions": ["tabs"],
  "host_permissions": ["http://e/*"],

  "background": {
    "service_worker": "background.js"
  }
}
````

### 2.2 `background.js`

```js
chrome.tabs.onCreated.addListener((tab) => {
  const url = tab.pendingUrl || tab.url || "";
  if (url.startsWith("chrome://newtab") || url === "about:blank") {
    chrome.tabs.update(tab.id, { url: "http://e/" });
  }
});
```

*(Optional icon – drop a `128 px` PNG alongside and add
`"icons": { "128": "icon.png" }` to the manifest.)*

---

## 3 Install locally (unpacked)

1. Place the two files above inside a folder, e.g. **`new-tab-e`**.
2. Open **chrome://extensions**.
3. Enable **Developer mode** (toggle, top-right).
4. Click **Load unpacked** ➜ choose the folder.
5. Hit **Ctrl + T** (⌘ + T on macOS) – the tab should jump to **`http://e/`**.

---

## 4 Customization

| To change…         | Edit…                         | Then…                         |
| ------------------ | ----------------------------- | ----------------------------- |
| **Target URL**     | `background.js` (last line)   | Save & click **Reload**       |
| **Extension name** | `manifest.json` → `"name"`    | Reload                        |
| **Version**        | `manifest.json` → `"version"` | Bump before packing a release |

---

## 5 Pack for distribution

1. Go to **chrome://extensions → Pack extension**.
2. Select the project folder, click **Pack**.
   Chrome outputs a `.crx` package and a `.pem` private key.
3. Share the `.crx`; users drag-and-drop it onto **chrome://extensions** (Developer mode must be on) or push via enterprise policy.

---

## 6 Troubleshooting

| Issue                                         | Fix / Cause                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **“Service worker registration failed”**      | Check DevTools ▸ Console – make sure `background.js` is *JavaScript*, not an HTML snippet.  |
| **“Unexpected token '<'” in `background.js`** | File accidentally contains HTML; overwrite with the JS above.                               |
| New tab stays on the default page             | Another extension overrides the New-Tab page or corporate policy blocks `tabs.update`.      |
| URL changes but focus leaves address bar      | Expected – after navigation Chrome gives focus to the page; extensions can’t override this. |

---

## 7 License

Free / Open-Source (public domain or MIT – pick your favourite).
