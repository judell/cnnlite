// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Background script received message:', request);
  if (request.action === "fetchImages") {
    console.log('Fetching images from URL:', request.url);
    fetch(request.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
      .then(response => {
        console.log('Fetch response received', response);
        return response.text();
      })
      .then(html => {
        console.log('HTML received, length:', html.length);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        console.log('All img tags:', doc.querySelectorAll('img').length);
        const images = Array.from(doc.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          class: img.className
        }));
        console.log('All images found:', images);
        sendResponse({images: images});
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        sendResponse({error: error.toString()});
      });
    return true;  // Indicates we wish to send a response asynchronously
  }
});

console.log('Background script loaded');

