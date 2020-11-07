// ==UserScript==
// @name        ThotBlock
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/*
// @grant       GM_xmlhttpRequest
// @connect     https://gist.githubusercontent.com
// @version     1.1
// @author      if-otherwise
// @run-at      document-idle
// @description Annoyed of seeing softcore porn thumbnails of girls making a living on simp money when you're just looking to find an interesting stream? 
//              Have no fear, ThotBlock is here!
// ==/UserScript==

(function() {
    console.log('Initiating ThotBlock!');

    let thots = [];
    
    // Remote JSON of thot list. Replace this with your own array, link to array, or keep this one which will be updated periodically
    let thotListJson = 'https://gist.githubusercontent.com/if-otherwise/41ba8833138245cab13e2bc19f833b0d/raw/blocklist.json';

    // This is specific to violentmonkey (https://violentmonkey.github.io). 
    // Tamper/grease have a bit different formatting and will not work.
    GM_xmlhttpRequest({
      method:         'GET',
      url:            thotListJson,
      responseType:   'json',
      onload:         setThotList,
      onerror:        reportError,
      ontimeout:      reportError,
      onabort:        reportError
    });

    let thotsRetrieved = false;
    function setThotList(data) {
      try {
        thots = data.response;
        thotsRetrieved = true;
        console.log('Successfully retrieved Thot List from Github!');
      }
      catch(e) {
        console.error('ThotBlock Error: ' + e.message)
      }
    }

    function reportError(data) {
      alert('Error retrieving thot list! The github gist may be inaccessible or the request timed out (usually because your internet is bad).')
    }
    
    function deleteThots () {
      // changing to a location.href if statement to account for the way the site loads
      // this is instead of the UserScript @match for /directory/game/
      if (!!location.href.includes("/directory/game/")) {
        let allNodes = document.querySelectorAll('a[data-a-target="preview-card-channel-link"]');
        if (allNodes.length && thots.length) {
          allNodes.forEach((node) => {
            if (thots.includes(node.innerText) || thots.includes(node.innerText.toLowerCase())) {
              thots = thots.filter(e => e !== node.innerText);
              console.log('Removing Thot: ' + node.innerText);
              let count = 0;
              let els = [];
              while (count < 12) {
                els.unshift(node);
                node = node.parentNode;
                count++
              }
              els[0].remove();
            }
          });
        } else if (thotsRetrieved) {
          alert('ThotBlock list is empty! Update the thot array at the top of the document or make sure your remote list is accessible.')
        }
      }
    }

    deleteThots();

    setInterval(() => {
      deleteThots();
    }, 2000)
  
})();
