module.exports = async (page, scenario, vp) => {
  await require('./clickAndHoverHelper')(page, scenario);

  // Remove AOS attributes and handle all lazy loading
  await page.evaluate(async () => {
    // Handle all images
    document.querySelectorAll('img').forEach(img => {
      // Remove lazy loading attributes
      img.removeAttribute('loading');
      img.removeAttribute('decoding');

      // Force eager loading
      img.loading = 'eager';

      // Check all possible data attributes for source
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      if (img.dataset.originalSrc) {
        img.src = img.dataset.originalSrc;
      }

      // Remove lazy loading classes
      img.classList.remove('lazyload', 'lazy');
      img.classList.add('lazyloaded');

      // Force image decode
      if (img.decode) {
        try {
          img.decode();
        } catch (err) {
          console.log('Image decode error:', err);
        }
      }
    });

    // Function to set background image
    const setBackgroundImage = (element, url) => {
      if (!url) return false;

      // Remove any lazy loading classes
      element.classList.remove('lazyload', 'lazy');
      element.classList.add('lazyloaded');

      // Set the background image
      element.style.backgroundImage = `url('${url}')`;
      return true;
    };

    // Handle all elements with potential background images
    document.querySelectorAll('*').forEach(element => {
      // Check for various data attributes
      const bgSources = [
        element.getAttribute('data-bg-image'),
      ];

      // Try to set background from any available source
      for (const source of bgSources) {
        if (source && source !== 'none') {
          const url = source.replace(/^url\(['"]?(.+?)['"]?\)$/, '$1');
          if (setBackgroundImage(element, url)) {
            break;
          }
        }
      }
    });
  });

  // Wait for network to be idle
  await page.waitForNetworkIdle({ idleTime: 1000 });

  // Wait for all images to load and decode
  await page.evaluate(async () => {
    const images = Array.from(document.getElementsByTagName('img'));
    await Promise.all(images.map(img => {
      return new Promise(resolve => {
        if (img.complete) {
          if (img.decode) {
            img.decode().then(resolve).catch(resolve);
          } else {
            resolve();
          }
        } else {
          img.addEventListener('load', () => {
            if (img.decode) {
              img.decode().then(resolve).catch(resolve);
            } else {
              resolve();
            }
          });
          img.addEventListener('error', resolve);
        }
      });
    }));
  });
};
