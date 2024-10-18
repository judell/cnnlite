// content.js
(function() {
  console.log('CNN Lite Image Injector script started');

  const liteUrl = window.location.href;
  const fullUrl = liteUrl.replace('lite.cnn.com', 'www.cnn.com');

  function injectImages(images) {
    console.log('Attempting to inject images:', images);
    const article = document.querySelector('.article--lite');
    if (!article) {
      console.error('Article container not found');
      return;
    }

    const imageContainer = document.createElement('div');
    imageContainer.style.borderTop = '1px solid #ccc';
    imageContainer.style.marginTop = '20px';
    imageContainer.style.paddingTop = '20px';

    images.forEach((img, index) => {
      const figure = document.createElement('figure');
      figure.style.display = 'inline-block';
      figure.style.width = '30%';
      figure.style.margin = '10px 1.5%';
      figure.style.verticalAlign = 'top';

      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      newImg.style.width = '100%';

      const caption = document.createElement('figcaption');
      caption.textContent = img.alt || `Image ${index + 1}`;
      caption.style.fontSize = '0.8em';
      caption.style.color = '#666';
      caption.style.marginTop = '5px';

      figure.appendChild(newImg);
      figure.appendChild(caption);
      imageContainer.appendChild(figure);
    });

    const heading = document.createElement('h2');
    heading.textContent = 'Article Images';
    heading.style.fontSize = '1.2em';
    heading.style.marginBottom = '10px';

    article.appendChild(heading);
    article.appendChild(imageContainer);
  }

  function fetchImages() {
    console.log('Requesting images from background script');
    chrome.runtime.sendMessage({action: "fetchImages", url: fullUrl}, function(response) {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
        return;
      }
      console.log('Images received:', response);
      if (response && response.images) {
        injectImages(response.images);
      }
    });
  }

  if (document.querySelector('.article--lite')) {
    fetchImages();
  } else {
    console.log('Article not found, waiting for content to load');
    new MutationObserver((mutations, observer) => {
      if (document.querySelector('.article--lite')) {
        observer.disconnect();
        fetchImages();
      }
    }).observe(document.body, {childList: true, subtree: true});
  }
})();

