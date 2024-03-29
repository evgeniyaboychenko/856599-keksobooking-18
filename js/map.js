'use strict';
(function () {
  var adsData;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var flagShowCard = false;

  // добавление меток в фрагмент
  var createPinsFragment = function (dataLoad) {
    adsData = dataLoad;
    var numberAds = adsData.length > window.util.numberPin ? window.util.numberPin : adsData.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < numberAds; i++) {
      if (adsData[i].offer) {
        fragment.appendChild(window.pin.createMapPin(adsData[i]));
      }
    }
    return fragment;
  };

  // добавление карточки метки в фрагмент
  var createCardPinFragment = function (number) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.createCardAd(adsData[number]));
    return fragment;
  };


  // при нажатии на ESC удалить карточку
  var onClosePopupPressEscKey = function (evt) {
    if (evt.keyCode === window.util.escKey) {
      onClosePopupPressClick();
    }
  };

  // при закрытии формы удалить карточку и удалить обработчик при Esc
  var onClosePopupPressClick = function () {
    removeCard();
  };

  // удалить карточку
  var removeCard = function () {
    var popupCard = window.util.windowMap.querySelector('.map__card');
    var mapPinActive = window.util.mapPins.querySelector('.map__pin--active');

    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }

    if (popupCard) {
      popupCard.remove();
      document.removeEventListener('keydown', onClosePopupPressEscKey);
    }
    flagShowCard = false;
  };


  var showCardPin = function (pinActive) {
    var pins = window.util.mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (pin, index) {
      if (pin === pinActive) {
        pinActive.classList.add('map__pin--active');
        mapFiltersContainer.before(createCardPinFragment(index - 1));
        flagShowCard = true;
      }
    });
  };

  // создать карточку объявления при нажатии на метку
  var onPinClick = function (evt) {
    var pinClickMap = evt.target.closest('button[type="button"]');
    if (!pinClickMap) {
      return;
    }
    if (flagShowCard) {
      removeCard();
    }

    showCardPin(pinClickMap);

    var popupCard = window.util.windowMap.querySelector('.map__card');
    var buttonClosePopup = popupCard.querySelector('.popup__close');
    buttonClosePopup.addEventListener('click', onClosePopupPressClick);
    document.addEventListener('keydown', onClosePopupPressEscKey);
  };

  // добавить обраточкик события для показа карточки объявления при click на метку
  var addListenerAddCardPressPin = function () {
    window.util.mapPins.addEventListener('click', onPinClick);
  };

  addListenerAddCardPressPin();

  window.map = {
    createPinsFragment: createPinsFragment,
    removeCard: removeCard
  };
})();
