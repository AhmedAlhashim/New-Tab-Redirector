```markdown
# New Tab Redirector (HTML version)

Opens **`http://e/`** in every new Chrome tab and keeps the address bar highlighted for fast typing.

---

## 1  Overview
This extension replaces Chrome’s default **New Tab** page with an HTML file that instantly redirects to **`http://e/`**.

* **Lightweight** – just two files (`manifest.json` and `redirect.html`)
* **No store needed** – load it locally or pack it as a `.crx`
* **Focus preserved** – the URL remains selected after the redirect  
  
---

## 2  Folder structure

```

new-tab-redirector/
├─ manifest.json      ← extension metadata
└─ redirect.html      ← one-line meta-refresh to [http://e/](http://e/)

````

### 2.1  `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "New Tab → http://e/",
  "version": "1.0",
  "description": "Loads http://e/ every time a new tab is opened.",
  "chrome_url_overrides": {
    "newtab": "redirect.html"
  }
}
````

### 2.2  `redirect.html`

```html
<!doctype html>
<meta http-equiv="refresh" content="0; url=http://e/">
```

*(Optional icon: add a 128×128 PNG and include
`"icons": { "128": "icon.png" }` in the manifest.)*

---

## 3  Install locally (unpacked)

1. Save the two files above inside a folder named **`new-tab-redirector`**.
2. Open **chrome://extensions** in Chrome.
3. Toggle **Developer mode** (top right).
4. Click **Load unpacked** and choose the folder.
5. Press **Ctrl + T** (⌘ + T on macOS) to confirm the redirect.

---

## 4  Customization

| To change…         | Edit…                         | Then…                                   |
| ------------------ | ----------------------------- | --------------------------------------- |
| **Target URL**     | `redirect.html`               | Save and click **Reload** in extensions |
| **Extension name** | `manifest.json` → `"name"`    | Reload                                  |
| **Version**        | `manifest.json` → `"version"` | Bump before packing a new release       |

---

## 5  Pack for distribution

1. Go to **chrome://extensions ▸ Pack extension**.
2. Select the project folder and click **Pack**.
   Chrome outputs a `.crx` file (install package) and a `.pem` key.
3. Share the `.crx`; recipients drag-and-drop it onto **chrome://extensions** (Developer mode must be on) or an admin deploys it via policy.

---

## 6  Troubleshooting

| Issue                               | Solution                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------ |
| **“Manifest is not valid JSON”**    | Check commas/braces in `manifest.json`.                                  |
| New tab stays blank                 | Ensure `redirect.html` exists and the filename matches the manifest.     |
| Redirect works but URL not selected | Disable other “New-Tab” or productivity extensions that may steal focus. |

---

## 7  License
Free / Open-Source
