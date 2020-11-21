// ==UserScript==
// @name        Remove YouTube Recommendations
// @namespace   Violentmonkey Scripts
// @match       *://*.youtube.com/watch?v*
// @grant       none
// @version     1.0
// @run-at      document-idle
// @author      if-otherwise
// @description bye bye rabbit hole
// ==/UserScript==

(function(){
  setTimeout(() => {
    if (!document.getElementById('secondary')) {
      document.getElementById('related').remove()
    } else {
      document.getElementById('secondary').remove();
      document.querySelector('button[aria-label="Theater mode (t)"]').click()
    }
  }, 1000)
})()
