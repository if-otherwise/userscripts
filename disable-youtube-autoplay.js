// ==UserScript==
// @name        Fuck Off YouTube Autoplay (WIP)
// @namespace   Violentmonkey Scripts
// @match       *://*.youtube.com/*
// @grant       none
// @version     1.0
// @author      if-otherwise
// @run-at      document-idle
// @description 10/28/2020, 11:46:23 PM
// ==/UserScript==

(function () {
    console.log('[Disable YouTube Autoplay]: Started at ' + new Date().toLocaleString());
    var attempt = 0;
    var stopAutoplay = setInterval(function () {
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
        else {
            console.log('[Disable YouTube Autoplay]: Autoplay button not present.');
            clearInterval(stopAutoplay);
        }
    }, 10000);
    stopAutoplay;
    document.body.addEventListener("yt-navigate-finish", function(event) {
        if (location.href.includes("watch?v")) {
            console.log('[Disable YouTube Autoplay]: Video page detected! Starting if autoplay button present. Current attempts: [' + attempt + ']');
            stopAutoplay;
        } else {
            clearInterval(stopAutoplay);
        }
    });
})();
