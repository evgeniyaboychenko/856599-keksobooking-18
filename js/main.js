'use strict';

var NUMBER_OFFER = 8;
var TITLE_OFFERS = ['Это лучшее предложение', 'Квартира в центре', 'Для одиночника', 'Дом с шикарным видом', 'Для большой компании'];
var TYPE_HOUSES = ['palace', 'flat', 'house', 'bungalo'];
var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS_OFFERS = ['Удобная, тихая, просторная', 'расположена в самом центре города', 'У нас вам будет комфортно', 'Квартира подходит для семьи с маленькими детьми'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADDRESSES_OFFERS = ['600, 350', '300, 350', '400, 250', '500, 350', '100, 350', '200, 450'];

var TEMPLATE_MAP_PIN = document.querySelector('#pin').content.querySelector('.map__pin');
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;

var MAP_PINS = document.querySelector('.map__pins');
var WIDTH_MAP = MAP_PINS.clientWidth;

var createAdsData = function () {
  var ads = [];
  for (var i = 0; i < NUMBER_OFFER; i++) {
    ads[i] = {
      author: {
        avatar: 'img/avatars/user0' + (generateRandomNumber(NUMBER_OFFER) + 1) + '.png'
      },
      offer: {
        title: TITLE_OFFERS[generateRandomNumber(TITLE_OFFERS.length)],
        address: ADDRESSES_OFFERS[generateRandomNumber(ADDRESSES_OFFERS.length)],
        price: generateRandomRange(200, 2000),
        type: TYPE_HOUSES[generateRandomNumber(TYPE_HOUSES.length)],
        rooms: generateRandomNumber(6) + 1,
        guests: generateRandomNumber(20) + 1,
        checkin: TIME_CHECKIN[generateRandomNumber(TIME_CHECKIN.length)],
        checkout: TIME_CHECKOUT[generateRandomNumber(TIME_CHECKOUT.length)],
        features: createRandomArray(FEATURES),
        description: DESCRIPTIONS_OFFERS[generateRandomNumber(DESCRIPTIONS_OFFERS.length)],
        photos: createRandomArray(PHOTOS)
      },
      location: {
        x: generateRandomNumber(WIDTH_MAP) + 1 - WIDTH_PIN / 2,
        y: generateRandomRange(130, 630) + 1 - HEIGHT_PIN
      }
    };
  }
  return ads;
};

var generateRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

var generateRandomRange = function (min, max) {
  return min + generateRandomNumber(max - min);
};

var createRandomArray = function (array) {
  var flagsArray = [];
  for (var i = 0; i < array.length; i++) {
    flagsArray[i] = generateRandomNumber(2);
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

var createAd = function (ad) {
  var mapPin = TEMPLATE_MAP_PIN.cloneNode(true);
  mapPin.style.left = ad.location.x + 'px';
  mapPin.style.top = ad.location.y + 'px';
  mapPin.children[0].src = ad.author.avatar;
  mapPin.children[0].alt = ad.offer.title;
  return mapPin;
};

var addAds = function () {
  var ads = createAdsData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_OFFER; i++) {
    fragment.appendChild(createAd(ads[i]));
  }
  return fragment;
};

var windowMap = document.querySelector('.map');
windowMap.classList.remove('map--faded');

MAP_PINS.appendChild(addAds());
// console.log(mapPin.offsetWidth);
// console.log(mapPin.offsetHeight);

