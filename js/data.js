'use strict';
(function () {
  var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
  var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
  var TITLE_OFFERS = ['Это лучшее предложение', 'Квартира в центре', 'Для одиночника', 'Дом с шикарным видом', 'Для большой компании'];
  var TYPE_HOUSES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS_OFFERS = ['Удобная, тихая, просторная', 'расположена в самом центре города', 'У нас вам будет комфортно', 'Квартира подходит для семьи с маленькими детьми'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ADDRESSES_OFFERS = ['600, 350', '300, 350', '400, 250', '500, 350', '100, 350', '200, 450'];
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;

  var widthMap = window.util.mapPins.clientWidth;

  var getRandomNumber = function (number) {
    return Math.floor(Math.random() * number);
  };

  var getRandomRange = function (min, max) {
    return min + getRandomNumber(max - min);
  };

  var createRandomArray = function (array) {
    var flagsArray = [];
    for (var i = 0; i < array.length; i++) {
      flagsArray[i] = getRandomNumber(2);
    }
    var randomArray = [];
    var j = 0;
    for (var k = 0; k < flagsArray.length; k++) {
      if (flagsArray[k] !== 0) {
        randomArray [j] = array [k];
        j++;
      }
    }
    return randomArray;
  };

  window.createAdsData = function () {
    var ads = [];
    for (var i = 0; i < window.util.numberOffer; i++) {
      ads[i] = {
        author: {
          avatar: 'img/avatars/user0' + (getRandomNumber(window.util.numberOffer) + 1) + '.png'
        },
        offer: {
          title: TITLE_OFFERS[getRandomNumber(TITLE_OFFERS.length)],
          address: ADDRESSES_OFFERS[getRandomNumber(ADDRESSES_OFFERS.length)],
          price: getRandomRange(200, 2000),
          type: TYPE_HOUSES[getRandomNumber(TYPE_HOUSES.length)],
          rooms: getRandomNumber(100) + 1,
          guests: getRandomNumber(10) + 1,
          checkin: TIME_CHECKIN[getRandomNumber(TIME_CHECKIN.length)],
          checkout: TIME_CHECKOUT[getRandomNumber(TIME_CHECKOUT.length)],
          features: createRandomArray(FEATURES),
          description: DESCRIPTIONS_OFFERS[getRandomNumber(DESCRIPTIONS_OFFERS.length)],
          photos: createRandomArray(PHOTOS)
        },
        location: {
          x: getRandomNumber(widthMap) + 1 - WIDTH_PIN / 2,
          y: getRandomRange(130, 630) + 1 - HEIGHT_PIN
        }
      };
    }
    return ads;
  };
})();
