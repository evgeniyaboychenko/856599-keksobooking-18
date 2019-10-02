'use strict';

var NUMBER_OFFER = 8;
var TITLE_OFFERS = ['Это лучшее предложение', 'Квартира в центре', 'Для одиночника', 'Дом с шикарным видом', 'Для большой компании'];
var TYPE_HOUSES = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_HOUSES_MAP = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
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


var TEMPLATE_MAP_CARD = document.querySelector('#card').content.querySelector('.map__card');

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var windowMap = document.querySelector('.map');

var formAd = document.querySelector('.ad-form');
var fieldsetsAd = formAd.querySelectorAll('fieldset');
var formFilters = document.querySelector('.map__filters');
var fieldsetsFilters = formFilters.querySelectorAll('fieldset');
var selectsFilters = formFilters.querySelectorAll('select');
var mapPinMain = document.querySelector('.map__pin--main');
var WIDTH_MAP_MAIN = mapPinMain.clientWidth;
var HEIGHT_MAP_MAIN = mapPinMain.clientHeight;
var addressField = formAd.querySelector('input[name="address"]');

var roomField = formAd.querySelector('select[name="rooms"]');
var guestField = formAd.querySelector('select[name="capacity"]');


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
        rooms: generateRandomNumber(100) + 1,
        guests: generateRandomNumber(10) + 1,
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
  var mapPinAvatar = mapPin.querySelector('img');
  mapPinAvatar.src = ad.author.avatar;
  mapPinAvatar.alt = ad.offer.title;
  return mapPin;
};

var adsData = createAdsData();

// добавление объявлений в фрагмент
var addAds = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_OFFER; i++) {
    fragment.appendChild(createAd(adsData[i]));
  }
  return fragment;
};

var getPropertyTypeName = function (key) {
  return TYPE_HOUSES_MAP[key];
};

// создание карточки объявления от объекта метка
var createCardAd = function (ad) {
  var mapCard = TEMPLATE_MAP_CARD.cloneNode(true);
  var mapCardAvatar = mapCard.querySelector('.popup__avatar');
  var mapCardTitle = mapCard.querySelector('.popup__title');
  var mapCardAddress = mapCard.querySelector('.popup__text--address');
  var mapCardPrice = mapCard.querySelector('.popup__text--price');
  var mapCardType = mapCard.querySelector('.popup__type');
  var mapCardCapacity = mapCard.querySelector('.popup__text--capacity');
  var mapCardTime = mapCard.querySelector('.popup__text--time');
  var mapCardFeatures = mapCard.querySelector('.popup__features');
  var mapCardDescription = mapCard.querySelector('.popup__description');
  var mapCardPhotos = mapCard.querySelector('.popup__photos');
  var mapCardPhoto = mapCardPhotos.querySelector('.popup__photo');
  mapCardTitle.textContent = ad.offer.title;
  mapCardAddress.textContent = ad.offer.address;
  mapCardPrice.textContent = ad.offer.price + '₽/ночь';
  mapCardType.textContent = getPropertyTypeName(ad.offer.type);
  mapCardCapacity.textContent = ad.offer.rooms + ' комнат' + getEndingWordRoom(ad.offer.rooms) + ' для ' + ad.offer.guests + ' гост' + ((ad.offer.guests === 1) ? 'я' : 'ей');
  mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  mapCardFeatures.innerHTML = '';
  for (var j = 0; j < ad.offer.features.length; j++) {
    var feature = ad.offer.features[j];
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature' + '--' + feature);
    mapCardFeatures.appendChild(featureElement);
  }

  mapCardDescription.textContent = ad.offer.description;
  if (ad.offer.photos.length !== 0) {
    mapCardPhoto.src = ad.offer.photos[0];
    for (var i = 1; i < ad.offer.photos.length; i++) {
      var mapCardImage = mapCardPhoto.cloneNode(true);
      mapCardImage.src = ad.offer.photos[i];
      mapCardPhotos.appendChild(mapCardImage);
    }
  } else {
    mapCardPhotos.textContent = 'Фото жилья отсутствует';
  }
  mapCardAvatar.src = ad.author.avatar;
  return mapCard;
};

var getEndingWordRoom = function (number) {
  var ending = '';
  if ((number < 10 || number > 20) && number % 10 === 1) {
    ending = 'а';
  } else if ((number < 10 || number > 20) && (number % 10 === 2 || number % 10 === 3 || number % 10 === 4)) {
    ending = 'ы';
  }
  return ending;
};
// добавление карточки метки в фрагмент
var addCardMap = function (number) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCardAd(adsData[number]));
  return fragment;
};

// добавление атрибута 'disabled'
var setDisabledAttribute = function (field) {
  for (var i = 0; i < field.length; i++) {
    field[i].setAttribute('disabled', 'disabled');
  }
};

// удаление атрибута 'disabled'
var removeDisabledAttribute = function (field) {
  for (var i = 0; i < field.length; i++) {
    field[i].removeAttribute('disabled');
  }
};

// поля формы не активны
var setDisabledForm = function () {
  setDisabledAttribute(fieldsetsAd);
  setDisabledAttribute(fieldsetsFilters);
  setDisabledAttribute(selectsFilters);
};

// поля формы активны
var removeDisabledForm = function () {
  removeDisabledAttribute(fieldsetsAd);
  removeDisabledAttribute(fieldsetsFilters);
  removeDisabledAttribute(selectsFilters);
};

// вычисление координат середины метки
var setAddressMapMain = function () {
  var xMapMain = parseInt(mapPinMain.style.left, 10) + Math.round(WIDTH_MAP_MAIN / 2);
  var yMapMain = parseInt(mapPinMain.style.top, 10) + Math.round(HEIGHT_MAP_MAIN / 2);
  addressField.setAttribute('value', xMapMain + ', ' + yMapMain);
};

// вычисление координат метки с концом
var setAddressOnMapMainMove = function () {
  var xMapMain = parseInt(mapPinMain.style.left, 10) + Math.round(WIDTH_MAP_MAIN / 2);
  var yMapMain = parseInt(mapPinMain.style.top, 10) + HEIGHT_MAP_MAIN + 22;
  addressField.setAttribute('value', xMapMain + ', ' + yMapMain);
};

// -----------------------валидация формы-------------------------
// валидация Заголовок объявления
var checkedTitleFields = function () {
  var titleField = formAd.querySelector('input[name="title"]');
  titleField.addEventListener('invalid', function () {
    if (titleField.validity.tooShort) {
      titleField.setCustomValidity('Заголовок должен быть больше 30 символов');
    } else if (titleField.validity.valueMissing) {
      titleField.setCustomValidity('Заголовок должен быть заполнен');
    } else {
      titleField.setCustomValidity('');
    }
  });
};
checkedTitleFields();

// стоимость по типу жилья
var MIN_PRICE_HOUSES_MAP = {palace: 10000, flat: 1000, house: 5000, bungalo: 0};
var typeHouseField = formAd.querySelector('select[name="type"]');
var priceField = formAd.querySelector('input[name="price"]');

priceField.addEventListener('invalid', function () {
  if (priceField.validity.valueMissing) {
    priceField.setCustomValidity('Введите цену');
  } else if (priceField.validity.stepMismatch) {
    priceField.setCustomValidity('Цена не соответствует шагу в 10');
  } else if (priceField.validity.rangeOverflow) {
    priceField.setCustomValidity('Стоимость не может быть больше 1000000');
  } else {
    priceField.setCustomValidity('');
  }
});

var determinateMinPriceHouse = function () {
  priceField.setAttribute('placeholder', MIN_PRICE_HOUSES_MAP[typeHouseField.value]);
  priceField.setAttribute('min', MIN_PRICE_HOUSES_MAP[typeHouseField.value]);
};

var checkedPriceFields = function () {
  if (priceField.value < MIN_PRICE_HOUSES_MAP[typeHouseField.value]) {
    priceField.setCustomValidity('Минимальная стоимость для выбранного типа жилья должна быть выше ' + MIN_PRICE_HOUSES_MAP[typeHouseField.value]);
  } else {
    priceField.setCustomValidity('');
  }
};

var setFieldsPriceHouse = function () {
  determinateMinPriceHouse();
  checkedPriceFields();
};

determinateMinPriceHouse();
typeHouseField.addEventListener('change', setFieldsPriceHouse);
priceField.addEventListener('change', setFieldsPriceHouse);

// проверка соответствия комнат кол-ву гостей
var checkedGuestsFields = function () {
  if (roomField.value === '1' && guestField.value !== '1') {
    guestField.setCustomValidity('Только 1 гость может быть для 1 комнаты ');
  } else if ((roomField.value === '2' && guestField.value === '3') || (roomField.value === '2' && guestField.value === '0')) {
    guestField.setCustomValidity('Только 1 или 2 гостя могут быть для 2 комнат ');
  } else if (roomField.value === '3' && guestField.value === '0') {
    guestField.setCustomValidity('Только 1, 2 или 3 гостя могут быть для 3 комнат');
  } else if (roomField.value === '100' && guestField.value !== '0') {
    guestField.setCustomValidity('100 комнат может быть только "не для гостей"');
  } else {
    guestField.setCustomValidity('');
  }
};

checkedGuestsFields();
roomField.addEventListener('change', checkedGuestsFields);
guestField.addEventListener('change', checkedGuestsFields);

// ------------------------------------------------------
// соответствие время выезда времени въезда
var timeInField = formAd.querySelector('select[name="timein"]');
var timeOutField = formAd.querySelector('select[name="timeout"]');

timeInField.addEventListener('change', function () {
  timeOutField.value = timeInField.value;
});

timeOutField.addEventListener('change', function () {
  timeInField.value = timeOutField.value;
});
// ----------------------------------------------------------------------------

setDisabledForm();
setAddressMapMain();

// ----------------------------------------------------------------------------

var MAP_FILTERS_CONTAINER = document.querySelector('.map__filters-container');
var flagShowCard = false;

// при нажатии на ESC удалить карточку
var onClosePopupPressEscKey = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onClosePopupPressClick();
  }
};

// при закрытии формы удалить карточку и удалить обработчик при Esc
var onClosePopupPressClick = function () {
  removeCard();
  document.removeEventListener('keydown', onClosePopupPressEscKey);
};

// удалить карточку
var removeCard = function () {
  var popupCard = windowMap.querySelector('.popup');
  popupCard.remove();
  flagShowCard = false;
};

// создать карточку объявления при нажатии на метку
var onAddCardClickPin = function (evt) {
  var pinClickMap = evt.target.closest('button[type="button"]');
  if (!pinClickMap) {
    return;
  }
  if (flagShowCard) {
    removeCard();
  }
  var pins = MAP_PINS.children;
  for (var i = 0; i < pins.length; i++) {
    if (pins[i] === pinClickMap) {
      MAP_FILTERS_CONTAINER.before(addCardMap(i - 2));
      flagShowCard = true;
    }
  }
  var popupCard = windowMap.querySelector('.popup');
  var buttonClosePopup = popupCard.querySelector('.popup__close');
  buttonClosePopup.addEventListener('click', onClosePopupPressClick);
  document.addEventListener('keydown', onClosePopupPressEscKey);
};

// создать карточку при нажатии на enter
var onAddCardPressEnterPin = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onAddCardClickPin(evt);
  }
};

// активация формы при нажатии Enter на главную метку
var onActiveFormPressEnter = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onActiveForm(evt);
  }
};

// активация формы
var onActiveForm = function (evt) {
  windowMap.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  MAP_PINS.appendChild(addAds());
  setAddressOnMapMainMove();
  removeDisabledForm();
  removeListenerActMapMain(evt);
};

// удалить обработчики события
var removeListenerActMapMain = function () {
  mapPinMain.removeEventListener('mousedown', onActiveForm);
  mapPinMain.removeEventListener('keydown', onActiveFormPressEnter);
};
// добавить обработчики события
var addListenerActMapMain = function () {
  mapPinMain.addEventListener('mousedown', onActiveForm);
  mapPinMain.addEventListener('keydown', onActiveFormPressEnter);

};

// добавить обраточкики события для показа карточки объявления при нажатии на метку
var addListenerAddCardPressPin = function () {
  MAP_PINS.addEventListener('mousedown', onAddCardClickPin);
  MAP_PINS.addEventListener('keydown', onAddCardPressEnterPin);
};

addListenerActMapMain();
addListenerAddCardPressPin();


