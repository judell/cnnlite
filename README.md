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
    autonumber
    participant User
    participant LitePage as lite.cnn.com
    participant CS as content.js
    participant BG as background.js (service worker)
    participant FP as www.cnn.com

    %% User interaction
    User->>LitePage: Open CNN Lite article
    
    %% Content script loading and checking
    LitePage->>CS: Load content.js
    CS->>LitePage: Check for lite article content (dom internal)
    
    alt Article not yet loaded
        CS->>LitePage: Observe page for article load (dom internal)
    end
    
    %% Content extraction and message passing
    CS->>CS: Extract full CNN URL (dom internal)
    CS->>BG: Send "fetchHTML" request with full URL (js message passing)
    
    %% Fetch full article HTML
    BG->>FP: Fetch full article HTML (http request)
    FP-->>BG: Return full article HTML (http response)
    
    %% Returning full article and parsing content
    BG-->>CS: Send full article HTML (js message passing)
    CS->>CS: Parse HTML for image URLs (dom internal)
    CS->>LitePage: Inject images into lite article (dom internal)
```
