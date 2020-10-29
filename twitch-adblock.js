// ==UserScript==
// @name        Fuck Off Twitch Ads
// @namespace   Violentmonkey Scripts
// @match       https://*.twitch.tv/*
// @grant       none
// @version     1.0
// @author      if-otherwise
// @run-at      document-idle
// @description 10/28/2020, 11:24:10 PM
// ==/UserScript==

(function() {
    console.log('############# Starting "Fuck Off Twitch Ads" #############');
    if ( /(^|\.)twitch\.tv$/.test(document.location.hostname) === false ) { return; }
    var realFetch = window.fetch;
    window.fetch = function(input, init) {
        if ( arguments.length >= 2 && typeof input === 'string' && input.includes('/access_token') ) {
            var url = new URL(arguments[0]);
            url.searchParams.set("player_type", "frontpage");
            arguments[0] = url.href;
        }
        return realFetch.apply(this, arguments);
    };
    // If above fails, replace ad video with one of your own - because fuck ads. Catch up on a show or something 
    var video = document.querySelector('.video-player video');
    var playButton = document.querySelector('.player-controls__left-control-group > div:nth-child(1) > button:nth-child(1)');
    playButton.click();
    playButton.click();
    // twitch a bit fucky with how it loads elements. this is a super bandaid fix until I can do more testing
    setTimeout(() => {
        var adOverlay = document.querySelector('span[data-test-selector=ad-banner-default-text]');
        if (adOverlay !== null) {
            console.log('############# Replacing Twitch Video #############');
            var userVideo = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mov-file.mov'; // <-- REPLACE WITH WHATEVER HOSTED VID FILE
            video.src = userVideo;
            if (!!window.localStorage.getItem('adReplacementTime')) {
                video.currentTime = parseFloat(window.localStorage.getItem('adReplacementTime'));
                playButton.click();
                playButton.click();
            } else {
                playButton.click();
                playButton.click();
                var isAdPlaying = setInterval(() => {
                    if (adOverlay === null) {
                        console.log('############# Ad Complete #############');
                        window.localStorage.setItem('adReplacementTime', video.currentTime);
                        clearInterval(isAdPlaying);
                        window.location.reload();
                    }
                }, 1000);
                isAdPlaying;
            }
        } else {
          console.log('############# No Ad Present #############');
        }
    }, 5000);
})()
