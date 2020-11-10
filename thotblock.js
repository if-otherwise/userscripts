// ==UserScript==
// @name        ThotBlock
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/*
// @grant       GM_xmlhttpRequest
// @connect     gist.githubusercontent.com
// @updateURL   https://raw.githubusercontent.com/if-otherwise/violentmonkey-scripts/main/thotblock.js
// @downloadURL https://raw.githubusercontent.com/if-otherwise/violentmonkey-scripts/main/thotblock.js
// @version     1.12
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
              try {
                console.info('Removing Thot: ' + node.innerText);
                let count = 0;
                let els = [];
                let nodeLevelNumber;
                // There seems to be browser-specific updates to the UI that changes the parent node number.
                // I'll keep a lookout for this to be universal, but currently only firefox
                let browser = (function () {
                    var ua= navigator.userAgent, tem,
                    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                    if(/trident/i.test(M[1])){
                        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                        return 'IE '+(tem[1] || '');
                    }
                    if(M[1]=== 'Chrome'){
                        tem= ua.match(/\b(OPR|Edge?)\/(\d+)/);
                        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');            
                    }
                    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
                    return M.join(' ');
                })();
                if (browser.includes('Firefox')) {
                  nodeLevelNumber = 15
                } else {
                  nodeLevelNumber = 12
                }
                while (count < nodeLevelNumber) {
                  els.unshift(node);
                  node = node.parentNode;
                  count++
                }
                els[0].remove();
              }
              catch (e) {
                console.error('ThotBlock Error: ' + e.message)
              }
            }
          });
        } else if ((thotsRetrieved && !thots) || (thotsRetrieved && !thots.length)) {
          let userResonse = confirm('Thot List is empty!\nThere may have been an error, or the remote list is inaccessible.\nSelect OK to refresh and try again.');
          if (userResonse == true) {
            window.location.reload()
          } else {
            console.error('Thot List is empty!\nThere may have been an error, or the remote list is inaccessible.\nRefresh the page and try again.')
          }
        } else {
          if (!allNodes.length && thotsRetrieved) {
            let userResonse = confirm('ThotBlock Error!\nWhen switching sorting (views vs. recommended), the channels disappear.\nA fix is being researched.\nSelect OK to refresh, which will fix it!');
            if (userResonse == true) {
              window.location.reload()
            } else {
              console.error('ThotBlock Error!\nWhen switching sorting (views vs. recommended), the channels disappear.\nA fix is being researched.\nRefresh, which will fix it!')
            }
          }
        }
      }
    }
  
    setTimeout(() => {
      deleteThots();
    }, 2500)

    setInterval(() => {
      deleteThots();
    }, 2500);
  
})();
