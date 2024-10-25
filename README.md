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
    participant User
    participant LitePage as lite.cnn.com
    participant ContentScript as content.js
    participant BackgroundScript as background.js
    participant FullPage as www.cnn.com

    User->>LitePage: Open CNN Lite article
    LitePage->>ContentScript: Load content.js
    ContentScript->>LitePage: Check for lite article content (dom internal)
    alt Article not yet loaded
        ContentScript->>LitePage: Observe page for article load (dom internal)
    end
    ContentScript->>ContentScript: Extract full CNN URL (dom internal)
    ContentScript->>BackgroundScript: Send "fetchHTML" request with full URL (js message passing)
    BackgroundScript->>FullPage: Fetch full article HTML (http request)
    FullPage-->>BackgroundScript: Return full article HTML (http response)
    BackgroundScript-->>ContentScript: Send full article HTML (js message passing)
    ContentScript->>ContentScript: Parse HTML for image URLs (dom internal)
    ContentScript->>LitePage: Inject images into lite article (dom internal)

```
