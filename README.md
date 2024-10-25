# Chrome/Edge extention to add images to cnnlite.com articles

## Setup

1. Open Chrome or Edge browser.

1. Type chrome://extensions (for Chrome) or edge://extensions (for Edge) in the address bar and press Enter.

1. In the top-right corner, enable "Developer mode" by toggling the switch.

1. Click on the "Load unpacked" button that appears.

1. Navigate to the folder containing your extension files (manifest.json, content.js, background.js) and select it.

1. Click "Select Folder" (or equivalent) to load the extension.

The extension should now appear in your list of installed extensions. You may need to pin the extension to the toolbar for easy access.

## Result

![image](https://github.com/user-attachments/assets/dd9db835-264b-4a28-9303-26cda36b878c)

## Architecture

```mermaid
sequenceDiagram
    participant content.js
    participant lite.cnn article
    participant service worker
    participant cnn.com

    content.js ->> lite.cnn article: dom access: find full article url
    content.js ->> service worker: js message: full article url
    service worker ->> cnn.com: http request: fetch article
    cnn.com -->> service worker: http response: article html
    service worker -->> content.js: js message: article html
    content.js ->> lite.cnn article: dom access: inject image urls
```

