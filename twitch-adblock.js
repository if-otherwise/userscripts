// ==UserScript==
// @name        Fuck Off Twitch Ads
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/*
// @grant       none
// @version     1.0
// @author      if-otherwise
// @run-at      document-idle
// @description This is a script that replaces ads with a video of your choice. This is intended to be used while uBlock Origin is unable to stop ads - aka a bandaid fix.
// ==/UserScript==


(function () {
  'use strict';

  window.onload = function () {

    let options = {
      childList: true,
      subtree: true
    };
    
    var video = document.querySelector('.video-player video');

    let videoList = [
      'https://drive.google.com/uc?export=download&id=1XDzhzVbEkZShpvJ09xsC_H6geT4db9Nm',
      'https://drive.google.com/uc?export=download&id=1Q7dnHSeZvGma48WoSmtidY2BK1UL2Mcw',
      'https://drive.google.com/uc?export=download&id=1lQHdpj1IWO0Q300-ZGEOZufnRMwq3O1D',
      'https://drive.google.com/uc?export=download&id=1DA-BfYWACdLfBCl95J_GNwfR_i9o42iw',
      'https://drive.google.com/uc?export=download&id=1-AcVsl_URGWQxrmh7gboAaqLGuMWlAGv',
      'https://drive.google.com/uc?export=download&id=1hHae9uOSqDGkcBzvErJQzrnCgxnVTzPr',
      'https://drive.google.com/uc?export=download&id=19bp_sIwp1V-4ytna1fN6VgpFADDRi3mq',
      'https://drive.google.com/uc?export=download&id=1KacWtqr4ZSfkSO_cri85w_F7CZmIPGd4',
      'https://drive.google.com/uc?export=download&id=1nI_oRtnR2uqowFObLwGxWj91BkaI0K2o',
      'https://drive.google.com/uc?export=download&id=1SELVJG8Y9hBz-JdmJY6OeNf9F5diZ3b7',
      'https://drive.google.com/uc?export=download&id=11tXCpeEn9j9vNpNXA8fxjLNzLg5PEuiA',
      'https://drive.google.com/uc?export=download&id=1kNFA3hBiWT46t4y_qPnSJ4QLPSGdZgNn',
      'https://drive.google.com/uc?export=download&id=12xReMqpiQbhXAHoSzpfohgDRR599Af9Q',
      'https://drive.google.com/uc?export=download&id=1kwVtucMTHNFBgzOndi_KJ8mldBmkm8YX',
      'https://drive.google.com/uc?export=download&id=1JTJdd6_bD96G6MWtHxj0tkzcQhFMM_2x',
      'https://drive.google.com/uc?export=download&id=1CzyZYuQEPUTarRCLpTsx6KVO2RlFLzZx',
      'https://drive.google.com/uc?export=download&id=12l4xu7_uykNT3Lg6efvO7TztHxWk0l5K',
      'https://drive.google.com/uc?export=download&id=15Lwnl1Uy_VG702-ovxiVooVVQO_5ZorF',
      'https://drive.google.com/uc?export=download&id=1aooxDlt6i9KPDuegq9SFEwjTt5r-hXcV',
      'https://drive.google.com/uc?export=download&id=1Q1pr4B8Hk9r8DdTB5F2At7mIcwHpZis4',
      'https://drive.google.com/uc?export=download&id=1iXTl_DcNuL3Oyt1YaNrfoPCzjGXq2HTU',
      'https://drive.google.com/uc?export=download&id=1YsKlpK_4JeJMWMc-3K57MuQlB4uavbxj',
      'https://drive.google.com/uc?export=download&id=1UyVTEcTO37tohy3l9zdQF9bFoUEN9hBl',
      'https://drive.google.com/uc?export=download&id=1evyPT2P1smTs8jJizKh9ySHh732pbVsD',
      'https://drive.google.com/uc?export=download&id=1BBKUL7amqNll7A2jOb53uK02m21Pbrd8',
      'https://drive.google.com/uc?export=download&id=1H8Gz3VxQhov4KwOrfDxYvmWNMhKM2qLa',
      'https://drive.google.com/uc?export=download&id=1LFzvHY5bl0TE7uJddOyK3H26L7RBEcHs',
      'https://drive.google.com/uc?export=download&id=1x3fHu6-QokBmfugOFy4ECKr_xKTGYXG4'
    ];

    let completedVideos = [];

    function generateRandom(min, max) {
      var num = Math.floor(Math.random() * (max - min + 1)) + min;
      return (completedVideos.includes(num)) ? generateRandom(min, max) : num;
    }

    function selectVideo() {
      var selectedVideo = generateRandom(0, videoList.length);
      completedVideos.push(selectedVideo);
      video.src = videoList[selectedVideo];
    }

    function videoFinished() {
      setTimeout(() => {
        window.location.reload()
      }, 5750)
    }

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          let ad = node.querySelector('[data-test-selector="ad-banner-default-text"]');
          let adCounter = parseFloat(node.querySelector('div.tw-c-background-overlay:nth-child(4) > span:nth-child(1)').innerText.split(':')[1]);
          if (ad) {
            selectVideo();
            setInterval(() => {
              if ((Math.round(video.duration) - Math.round(video.currentTime)) <= 1) {
                selectVideo()
              }
              if (adCounter === 5) {
                videoFinished()
              }
            }, 500);
          }
        });
      });
    });

    const target = document.querySelector('[data-a-target="video-player"]');
    observer.observe(target, options);
  }
})();


