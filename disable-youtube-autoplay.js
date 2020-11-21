// ==UserScript==
// @name        Fuck Off YouTube Autoplay
// @namespace   Violentmonkey Scripts
// @match       *://*.youtube.com/*
// @grant       none
// @version     1.1
// @author      if-otherwise
// @run-at      document-idle
// @description stops yt autoplay
// ==/UserScript==

(function () {
    console.log('[Disable YouTube Autoplay]: Started at ' + new Date().toLocaleString());
    var attempt = 0;
    var stopAutoplay = setInterval(function () {
      if (location.href.includes("watch?v")) {
        attempt++;
        console.log('[Disable YouTube Autoplay]: Starting attempt [' + attempt + ']');
        var autoplayButton = document.querySelector('paper-toggle-button[aria-label="Autoplay"]');
        if (!!autoplayButton) {
          if (autoplayButton.checked && autoplayButton.active) {
            autoplayButton.click();
            console.log('[Disable YouTube Autoplay]: Autoplay disabled!');
            clearInterval(stopAutoplay);
          } else {
            console.log('[Disable YouTube Autoplay]: Autoplay already disabled!');
            clearInterval(stopAutoplay);
          }
        }
      }
    }, 1000);
    stopAutoplay;
})();
