// ==UserScript==
// @name        ThotBlock
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/directory/game/*
// @grant       none
// @version     1.0
// @author      if-otherwise
// @run-at      document-idle
// @description Annoyed of seeing softcore porn thumbnails of girls making a living on simp money when you're just looking to find an interesting stream? 
//              Have no fear, ThotBlock is here!
// ==/UserScript==

(function() {
  setTimeout(() => {

    console.log('Initiating ThotBlock!');

    var thots = [
      'Alinity',
      'JustaMinx',
      'melina',
      'InvaderVie',
      'STPeach',
      'Blinkx_',
      'BadGalShay',
      'cynthiajoon',
      'ExoHydraX',
      'Amouranth',
      'TaliaMar',
      'MizzyRose',
      'Jennalore',
      'xoAeriel',
      'Kate',
      'BadBunny',
      'LivStixs',
      'GirlGamerShay',
      'Cahlaflour',
      'codemiko',
      'shulyyyyyy',
      'evaanna',
      'bonnierabbit',
      'CinCinBear',
      'FAUXRE',
      'Beddle',
      'JuliaBayonetta_',
      'Krissi',
      'SeriousGaming',
      'Lizelda',
      'iaaras2',
      'Denims',
      'Meowko',
      'SarayaOfficial',
      'Ajvie',
      'avivasofia',
      'Neytiri',
      'Scxrlet64',
      'MSFIIIRE',
      'PaladinAmber',
      'baibaigirl',
      'awKie',
      'XPKitten',
      'ElfHerSelf',
      'Aribeee',
      'SoniAmats',
      'Swaggybark',
      'marinavalmont',
      'sarashionette',
      'MsGrimoire',
      'CrazyLuthien',
      'AlisaKissa69',
      'ElChiringuitoJugHD',
      'DOIIIUK',
      'Hollytwolf',
      'CarliTalbott',
      'NoeliaaYT',
      'kittycatnat1',
      'feliciasanders',
      'LadyPolytv',
      'kaceytron',
      'HANAWINS',
      'klaudiacroft',
      'Gayasai',
      'AbiCocca',
      'RitaGraves',
      'Tixaxxx',
      'JuditBenavente',
      '_휴미 (huemi_)',
      '김예하 (yeha23)',
      '임나은 (ao_o5)',
      '여름이0908 (qufakwdywjd)',
      'AmyeC3',
      'CRAY',
      'bebepeachx',
      'Pokimane',
      'Jaycgee',
      'Pink_Sparkles',
      'Kandyland',
      'KittyPlaysGames',
      'Loeya',
      'Loserfruit',
      'LegendaryLea',
      'DizzyKitten',
      'Xchocobars',
      'DingleDerper',
      'ChicaLive',
      'Miss_Rage',
      'Djarii',
      'Ms_Vixen',
      'AlexiaRaye',
      'xMinks',
      'KatGunn',
      'KneeColeslaw',
      '2MGoverCSquared',
      'OMGitsfirefoxx',
      'DeerNadia',
      'TaraBabcock',
      'Lilchiipmunk',
      'Schyax',
      'Djarii',
      'Emiru',
      'ClaraBabyLegs',
      'CinCinBear',
      'Mhova',
      'Morberplz',
      'KayPeaLol',
      'ChloeLock'
    ];

    function deleteThots () {
      var allNodes = document.querySelectorAll('a[data-a-target="preview-card-channel-link"]');
      if (allNodes.length && thots.length) {
        allNodes.forEach((node) => {
          if (thots.includes(node.innerText) || thots.includes(node.innerText.toLowerCase())) {
            thots = thots.filter(e => e !== node.innerText);
            console.log('Removing Thot: ' + node.innerText);
            var count = 0;
            var els = [];
            while (count < 12) {
              els.unshift(node);
              node = node.parentNode;
              count++
            }
            els[0].remove();
          }
        });
      }
    }

    deleteThots();

    setInterval(() => {
      deleteThots();
    }, 3000)

  }, 2000);
})();
