// ==UserScript==
// @name        ThotBlock
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/*
// @grant       GM_xmlhttpRequest
// @connect     gist.githubusercontent.com
// @updateURL   https://raw.githubusercontent.com/if-otherwise/violentmonkey-scripts/main/thotblock.js
// @downloadURL https://raw.githubusercontent.com/if-otherwise/violentmonkey-scripts/main/thotblock.js
// @version     1.11
// @author      if-otherwise
// @run-at      document-idle
// @description Annoyed of seeing softcore porn thumbnails of girls making a living on simp money
//              when you're just looking to find an interesting stream? 
//              Have no fear, ThotBlock is here!
// ==/UserScript==

(function() {

    console.log('Initiating ThotBlock!');

    let thots = [];
    
    // Remote JSON of thot list. This list will be updated periodically and currently has over 270 profiles.
    // You can replace this with your own remote list or an array right here.
    let thotListJson = 'https://gist.githubusercontent.com/if-otherwise/41ba8833138245cab13e2bc19f833b0d/raw/blocklist.json?cacheprevent='+(new Date).getTime();

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
        console.info('Successfully retrieved Thot List from Github!');    
        console.info(thots);
      }
      catch(e) {
        console.error('ThotBlock Error: ' + e.message)
      }
    }

    function reportError() {
      let userResonse = confirm('Error retrieving thot list!\nGithub may be inaccessible or the request timed out.\nClick OK to refresh and try again.');
      if (userResonse == true) {
        window.location.reload()
      } else {
        console.error('Error retrieving thot list!\nGithub may be inaccessible or the request timed out.\nRefresh the page and try again.')
      }
    }
    
    function deleteThots () {
      // changing to a location.href if statement to account for the way the site loads
      // this is instead of the UserScript @match for /directory/game/
      if (!!location.href.includes('/directory/game/')) {
        let allNodes = document.querySelectorAll('a[data-a-target="preview-card-channel-link"]');
        if (allNodes.length && thots.length) {
          allNodes.forEach((node) => {
            if (thots.includes(node.innerText) || thots.includes(node.innerText.toLowerCase())) {
              console.info('Removing Thot: ' + node.innerText);
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
        } else if ((thotsRetrieved && !thots) || (thotsRetrieved && !thots.length)) {
          let userResonse = confirm('Thot List is empty!\nThere may have been an error, or the remote list is inaccessible.\nSelect OK to refresh and try again.');
          if (userResonse == true) {
            window.location.reload()
          } else {
            console.error('Thot List is empty!\nThere may have been an error, or the remote list is inaccessible.\nRefresh the page and try again.')
          }
        }
      }
    }

    deleteThots();

    setInterval(() => {
      deleteThots();
    }, 2500);
  
})();
