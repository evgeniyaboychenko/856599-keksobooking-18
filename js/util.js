'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var NUMBER_OFFER = 8;
  var mapPins = document.querySelector('.map__pins');
  var formAd = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var windowMap = document.querySelector('.map');

  window.util = {
    enterKey: ENTER_KEYCODE,
    escKey: ESC_KEYCODE,
    numberOffer: NUMBER_OFFER,
    mapPins: mapPins,
    formAd: formAd,
    windowMap: windowMap,
    filterForm: filterForm
  };
})();
