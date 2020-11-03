// ==UserScript==
// @name         Fuck Off Twitch Ads v2
// @namespace    https://www.twitch.tv/
// @version      2.0
// @description  fuck ads nomesayin'
// @author       ifotherwise
// @match        https://www.twitch.tv/*
// @grant        none
// @homepageURL  none      
// ==/UserScript==

(function() {
    'use strict';


    const findVideoPlayer = function() {
        const videoPlayer = document.querySelector('[data-a-target="video-player"]');
        if (videoPlayer) {
            attachMutationObserver(videoPlayer);
        }
    }
  
    const attachMutationObserver = function(videoPlayer) {

        const dblclick = new MouseEvent('dblclick', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        let options = {
            childList: true,
            subtree: true
        };

        const adObserver = new MutationObserver(function(mutations) {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        let ad = node.querySelector('[data-test-selector="ad-banner-default-text"]');
                        if (ad) {
                            let resetButton = document.querySelector('[data-a-target="ffz-player-reset-button"]');
                            let videoPlayerElement = document.querySelector('video');
                            let currentVolume = videoPlayerElement.volume;
                            if (resetButton) {
                                resetButton.dispatchEvent(dblclick);
                                setTimeout(() => {
                                    videoPlayerElement.volume = currentVolume;
                                }, 2000);
                            } else {
                                window.location.reload();
                            }
                        }
                    }
                });
            });
        });

        adObserver.observe(videoPlayer, options);
    }

    window.onload = function() {

        findVideoPlayer();

        var pushState = history.pushState;
        history.pushState = function () {
            pushState.apply(history, arguments);
            findVideoPlayer();
        };
    }

})();
