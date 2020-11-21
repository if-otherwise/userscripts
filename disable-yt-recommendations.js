// ==UserScript==
// @name        Disable Recommendations
// @namespace   Violentmonkey Scripts
// @match       *://*.youtube.com/*
// @grant       none
// @version     1.1
// @run-at      document-idle
// @author      if-otherwise
// @description bye bye rabbit hole
// ==/UserScript==

(function(){
    console.log('[Disable YouTube Recommendations]: Started at ' + new Date().toLocaleString());
    let attempt = 0;
    let stopRecommendations = setInterval(function () {
      if (location.href.includes("watch?v")) {
        setTimeout(() => {
          attempt++;
          console.info('[Disable YouTube Recommendations]: Starting attempt [' + attempt + ']');
          let secondaryDiv = document.getElementById('secondary');
          let relatedDiv = document.getElementById('related');
          let theaterBtn = document.querySelector('button[aria-label="Theater mode (t)"]');
          if (!!secondaryDiv) {
            secondaryDiv.remove();
            if (!!theaterBtn) {
              theaterBtn.click();
            }
            console.info('[Disable YouTube Recommendations]: Recommendations disabled!');
            clearInterval(stopRecommendations);
          } else if (!!relatedDiv) {
            relatedDiv.remove();
            if (!!theaterBtn) {
              theaterBtn.click();
            }
            console.info('[Disable YouTube Recommendations]: Recommendations disabled!');
            clearInterval(stopRecommendations);
          }
        }, 1500)
      }
    }, 1000);
    stopRecommendations;
})()
