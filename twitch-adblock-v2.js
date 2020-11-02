// ==UserScript==
// @name        Fuck Off Twitch Ads v2
// @namespace   Violentmonkey Scripts
// @match       *://www.twitch.tv/*
// @grant       none
// @version     1.0
// @author      ifotherwise
// @description 11/2/2020, 12:14:34 AM
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function() {

        const dblclick = new MouseEvent('dblclick', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        let options = {
            childList: true,
            subtree: true
        };

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    let ad = node.querySelector('[data-test-selector="ad-banner-default-text"]');
                    if (ad) {
                        let resetButton = document.querySelector('[data-a-target="ffz-player-reset-button"]');

                        if (resetButton) {
                            resetButton.dispatchEvent(dblclick);
                        } else {
                            window.location.reload();
                        }
                    }
                });
            });
        });

        const target = document.querySelector('[data-a-target="video-player"]');

        observer.observe(target, options);
    }

})();
