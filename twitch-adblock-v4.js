// ==UserScript==
// @name         Twitch Adblock
// @namespace    Violentmonkey Scripts
// @version      1.1.2
// @description  [Working as of 11/20/2020] Blocks Twitch livestream ads
// @author       if-otherwise
// @include      https://www.twitch.tv/*
// @include      https://cdn.embedly.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  
    // TL;DR - This replaces the twitch player with an embedded variation, which doesn't get pre or mid-roll ads 
    // Will work so long as: 1) twitch doesn't require ads for embedded content, 2) embeddly continues supporting this use of their cdn
  
  
    if (window.location.origin == "https://cdn.embedly.com") {
        document.getElementsByTagName("html")[0].style = "overflow: hidden";
        return;
    }

    let lastStreamer, oldHtml;

    let observer = new MutationObserver(function (mutations, observer) {
        let container = document.querySelector(".video-player .tw-absolute");

        if (!container)
            return;

        if (window.location.pathname.indexOf("/directory") == 0)
            return;

        let streamerName = window.location.pathname.replace("/", "");
        let iframeUrl = `https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.twitch.tv%2F%3Fchannel%3D${streamerName}%26muted%3Dfalse%26parent%3Dcdn.embedly.com&type=text%2Fhtml&card=1&schema=twitch`;
        let existingIframe = container.getElementsByTagName("iframe")[0];

        if ((!streamerName && !lastStreamer) || streamerName.indexOf("videos/") == 0) {
            lastStreamer = null;

            for (let el of container.children)
                el.hidden = false;

            if (existingIframe) {
                existingIframe.src = "";
                existingIframe.hidden = true;
            }

            return;
        }
        else if (!streamerName)
            return;

        for (let el of container.children) {
            if (el.tagName != "IFRAME")
                el.hidden = true;

            if (el.tagName == "VIDEO")
                el.src = "";
        }

        if (!existingIframe) {
            existingIframe = document.createElement("iframe");
            existingIframe.src = iframeUrl;
            existingIframe.style = "width: 100%; height: 100%";
            container.appendChild(existingIframe);
        }
        else if (streamerName != lastStreamer) {
            existingIframe.src = iframeUrl;
            existingIframe.hidden = false;
        }

        lastStreamer = streamerName
    });

    observer.observe(document.getElementsByClassName("root-scrollable__wrapper tw-full-width tw-relative")[0], { attributes: false, childList: true, subtree: true });
})();
