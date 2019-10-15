'use strict';
(function () {
  var adsData;

  // добавление меток в фрагмент
  var addAds = function (dataLoad) {
    adsData = dataLoad;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataLoad.length; i++) {
      fragment.appendChild(window.pin.createAd(adsData[i]));
    }
    return fragment;
  };

  // добавление карточки метки в фрагмент
  var addCardMap = function (number) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.createCardAd(adsData[number]));
    return fragment;
  };

  // ////////////////////////////////////////////////////////////////////////////
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var flagShowCard = false;

  // при нажатии на ESC удалить карточку
  var onClosePopupPressEscKey = function (evt) {
    if (evt.keyCode === window.util.escKey) {
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
    var popupCard = window.util.windowMap.querySelector('.popup');
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
    var pins = window.util.mapPins.children;
    for (var i = 0; i < pins.length; i++) {
      if (pins[i] === pinClickMap) {
        mapFiltersContainer.before(addCardMap(i - 2));
        flagShowCard = true;
      }
    }
    var popupCard = window.util.windowMap.querySelector('.popup');
    var buttonClosePopup = popupCard.querySelector('.popup__close');
    buttonClosePopup.addEventListener('click', onClosePopupPressClick);
    document.addEventListener('keydown', onClosePopupPressEscKey);
  };

  // добавить обраточкик события для показа карточки объявления при click на метку
  var addListenerAddCardPressPin = function () {
    window.util.mapPins.addEventListener('click', onAddCardClickPin);
  };

  addListenerAddCardPressPin();

  window.map = {
    addAds: addAds
  };
})();
