// ==UserScript==
// @name        Fuck Off Twitch Ads
// @namespace   Violentmonkey Scripts
// @match       https://*.twitch.tv/*
// @grant       none
// @version     1.0
// @author      if-otherwise
// @run-at      document-idle
// @description This is a script that replaces ads with a video of your choice. This is intended to be used while uBlock Origin is unable to stop ads - aka a bandaid fix.
// ==/UserScript==

(function() {
    console.log('############# Starting "Fuck Off Twitch Ads" #############');
    var video = document.querySelector('.video-player video');
    var playButton = document.querySelector('.player-controls__left-control-group > div:nth-child(1) > button:nth-child(1)');
    var muteButton = document.querySelector('button[data-a-target="player-mute-unmute-button"]');
    var adOverlay = document.querySelector('span[data-test-selector=ad-banner-default-text]');
    playButton.click();
    setTimeout(() => {
        playButton.click();
        if (!!adOverlay) {
            console.log('############# Replacing Twitch Video #############');
            var userVideo = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mov-file.mov'; // <-- REPLACE WITH WHATEVER HOSTED VID FILE
            video.src = userVideo;
            if (!!window.localStorage.getItem('adReplacementTime')) {
                video.currentTime = parseFloat(window.localStorage.getItem('adReplacementTime'));
                playButton.click();
            } else {
                playButton.click();
                var timePlayed = 0;
                var isAdPlaying = setInterval(() => {
                    timePlayed++;
                    if (parseFloat(document.querySelector('div.tw-c-background-overlay:nth-child(4) > span:nth-child(1)').innerText.split(':')[1]) === 5) {
                      setTimeout(() => {
                        console.log('############# Ad Complete #############');
                        var savedTime = 0;
                        if (!!window.localStorage.getItem('adReplacementTime')) {
                          savedTime = parseFloat(window.localStorage.getItem('adReplacementTime')) + timePlayed;
                          window.localStorage.setItem('adReplacementTime', savedTime);
                        } else {
                          window.localStorage.setItem('adReplacementTime', timePlayed);
                        }
                        window.location.reload()
                      }, 5750)
                    }
                }, 1000);
                isAdPlaying;
            }
        } else {
          console.log('############# No Ad Present #############');
          playButton.click();
          muteButton.click();
          console.log('############# Starting Watcher For Midrolls #############');
          var isMidrollPlaying = setInterval(() => {
              if (!!adOverlay) {
                playButton.click();
                muteButton.click();
                var timePlayed = 0;
                timePlayed++;
                if (parseFloat(document.querySelector('div.tw-c-background-overlay:nth-child(4) > span:nth-child(1)').innerText.split(':')[1]) === 5) {
                  setTimeout(() => {
                    console.log('############# Ad Complete #############');
                    var savedTime = 0;
                    if (!!window.localStorage.getItem('adReplacementTime')) {
                      savedTime = parseFloat(window.localStorage.getItem('adReplacementTime')) + timePlayed;
                      window.localStorage.setItem('adReplacementTime', savedTime);
                    } else {
                      window.localStorage.setItem('adReplacementTime', timePlayed);
                    }
                    window.location.reload()
                  }, 5750)
                }
              }
          }, 1000);
          isMidrollPlaying;
        }
    }, 5000);
})()

