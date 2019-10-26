'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var widthMapMain = mapPinMain.clientWidth;
  var heightMapMain = mapPinMain.clientHeight;
  var addressField = window.util.formAd.querySelector('input[name="address"]');
  var adFormFieldsetList = window.util.formAd.querySelectorAll('fieldset');
  // var filterForm = document.querySelector('.map__filters');
  var filterFormFieldsetList = window.util.filterForm.querySelectorAll('fieldset');
  var filterFormSelectList = window.util.filterForm.querySelectorAll('select');
  var mapPinMainLeft = mapPinMain.style.left;
  var mapPinMainTop = mapPinMain.style.top;

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
    setDisabledAttribute(adFormFieldsetList);
    setDisabledAttribute(filterFormFieldsetList);
    setDisabledAttribute(filterFormSelectList);
  };

  // поля формы активны
  var removeDisabledForm = function () {
    removeDisabledAttribute(adFormFieldsetList);
    removeDisabledAttribute(filterFormFieldsetList);
    removeDisabledAttribute(filterFormSelectList);
  };

  // координаты (top,left) Main метки
  var getAdressPositionPinMain = function () {
    var xPinMain = parseInt(mapPinMain.style.left, 10);
    var yPinMain = parseInt(mapPinMain.style.top, 10);
    return {
      x: xPinMain,
      y: yPinMain
    };
  };

  // установить начальные координат Main метки с концом
  var setAddressPinMain = function () {
    addressField.setAttribute('value', (getAdressPositionPinMain().x + Math.round(widthMapMain / 2)) + ', ' + (getAdressPositionPinMain().y + Math.round(heightMapMain / 2)));
  };

  // установить координат Main метки с концом
  var setAddressOnPinMainMove = function () {
    addressField.setAttribute('value', (getAdressPositionPinMain().x + Math.round(widthMapMain / 2)) + ', ' + (getAdressPositionPinMain().y + heightMapMain + 16));
  };
  // ----------------------------------------------------------------------------

  // активация формы при нажатии Enter на главную метку
  var onActiveFormPressEnter = function (evt) {
    if (evt.keyCode === window.util.enterKey) {
      // onActiveForm(evt);
      onActiveForm();
    }
  };

  // активация формы
  var onActiveForm = function () {
    window.backend.load(onAddPin, onError);
    removeListenerActMapMain();
  };
  var isPinMainMouseDownSubscribed = true;
  var subscribeMainPinMouseDown = function () {
    if (!isPinMainMouseDownSubscribed) {
      isPinMainMouseDownSubscribed = true;
      mapPinMain.addEventListener('mousedown', onMainPinMouseMove);
    }
  };

  var unsubscribeMainPinMouseDown = function () {
    if (isPinMainMouseDownSubscribed) {
      isPinMainMouseDownSubscribed = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      mapPinMain.removeEventListener('mousedown', onMainPinMouseMove);
    }
  };


  var adsLoad = [];
  var onAddPin = function (data) {
    subscribeMainPinMouseDown();

    adsLoad = data;
    showPin(adsLoad);

    window.util.windowMap.classList.remove('map--faded');
    window.util.formAd.classList.remove('ad-form--disabled');
    setAddressOnPinMainMove();
    removeDisabledForm();
  };

  var showPin = function (data) {
    resetPinMap();
    window.map.removeCard();
    window.util.mapPins.appendChild(window.map.addAds(data));
  // window.util.mapPins.appendChild(window.map.addAds(updateAds(data, getValueFilters())));
  };

  // ////////////фильтрация пинов//////////////////////
  var formFiltersSelect = window.util.filterForm.querySelectorAll('select');
  var formFiltersInput = window.util.filterForm.querySelectorAll('input');

  var selectTypeHouse = window.util.filterForm.querySelector('select[name="housing-type"]');
  var selectPrice = window.util.filterForm.querySelector('select[name="housing-price"]');
  var selectValueRooms = window.util.filterForm.querySelector('select[name="housing-rooms"]');
  var selectValueGuests = window.util.filterForm.querySelector('select[name="housing-guests"]');


  var filterAds = function (data) {
    var filtredAds = data;

    if (selectTypeHouse.value !== 'any') {
      filtredAds = filtredAds.filter(function (ad) {
        return selectTypeHouse.value === ad.offer.type;
      });
    }
    if (selectPrice.value !== 'any') {
      filtredAds = filtredAds.filter(function (ad) {
        return selectPrice.value === getPriceCategory(ad.offer.price);
      });
    }
    if (selectValueRooms.value !== 'any') {
      filtredAds = filtredAds.filter(function (ad) {
        return parseInt(selectValueRooms.value, 10) === ad.offer.rooms;
      });
    }
    if (selectValueGuests.value !== 'any') {
      filtredAds = filtredAds.filter(function (ad) {
        return parseInt(selectValueGuests.value, 10) === ad.offer.guests;
      });
    }

    formFiltersInput.forEach(function (input) {
      if (input.checked) {
        filtredAds = filtredAds.filter(function (ad) {
          return ad.offer.features.some(function (feature) {
            return feature === input.value;
          });
        });
      }
    });
    return filtredAds;
  };

  var onFilterChange = window.debounce(function () {
    showPin(filterAds(adsLoad));
  });

  formFiltersSelect.forEach(function (select) {
    select.addEventListener('change', onFilterChange);
  });

  formFiltersInput.forEach(function (input) {
    input.addEventListener('change', onFilterChange);
  });

  var getPriceCategory = function (price) {
    var category;
    if (price < 10000) {
      category = 'low';
    } else if (price > 50000) {
      category = 'high';
    } else {
      category = 'middle';
    }
    return category;
  };


  // ///////////////////////////////////
  // окно с ошибкой
  var onError = function (message) {
    unsubscribeMainPinMouseDown();

    var templateError = document.querySelector('#error').content;
    var cloneErrorPopup = templateError.cloneNode(true);
    var p = cloneErrorPopup.querySelector('p');
    p.textContent = message;
    document.querySelector('main').appendChild(cloneErrorPopup);
    var popupError = document.querySelector('.error');

    popupError.addEventListener('click', function (evt) {
      var buttonCloseClickPopup = evt.target.closest('.error__button');
      if (!buttonCloseClickPopup) {
        return;
      }
      popupError.remove();
      window.backend.load(onAddPin, onError);
    });
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

  // получить координаты метки на карте
  var getPositionPin = function (position, rangeStart, rangeEnd, shift, distance) {
    if (position + distance - shift < rangeStart) {
      return rangeStart - distance;
    } else if (position + distance - shift > rangeEnd) {
      return rangeEnd - distance;
    } else {
      return (position - shift);
    }
  };

  var mouseX;
  var mouseY;

  var onMouseMove = function (evtMove) {
    evtMove.preventDefault();
    var shiftX = mouseX - evtMove.clientX;
    var shiftY = mouseY - evtMove.clientY;

    mouseX = evtMove.clientX;
    mouseY = evtMove.clientY;

    mapPinMain.style.top = getPositionPin(getAdressPositionPinMain().y, 130, 630, shiftY, heightMapMain + 16) + 'px';
    mapPinMain.style.left = getPositionPin(getAdressPositionPinMain().x, 0, window.util.mapPins.clientWidth, shiftX, Math.round(widthMapMain / 2)) + 'px';

    setAddressOnPinMainMove();
  };

  var onMouseUp = function (evtUp) {
    evtUp.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  var onMainPinMouseMove = function (evt) {
    evt.preventDefault();
    window.map.removeCard();

    mouseX = evt.clientX;
    mouseY = evt.clientY;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  // ----------------сброс формы и меток------------------------

  var resetPinMap = function () {
    var pins = window.util.mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  var resetMapForm = function () {
    resetPinMap();
    window.map.removeCard();
    mapPinMain.style.left = mapPinMainLeft;
    mapPinMain.style.top = mapPinMainTop;
    setAddressPinMain();
    setDisabledForm();
    addListenerActMapMain();
    subscribeMainPinMouseDown();
    window.util.windowMap.classList.add('map--faded');
    window.util.formAd.classList.add('ad-form--disabled');
  };
  // ----------------------------------------------------

  setAddressPinMain();
  setDisabledForm();
  addListenerActMapMain();
  mapPinMain.addEventListener('mousedown', onMainPinMouseMove);

  // //////////////////////////////////
  // --- отправка формы-------------

  var onSuccessSave = function () {
    var templateSuccess = document.querySelector('#success').content;
    var cloneSuccessPopup = templateSuccess.cloneNode(true);
    document.querySelector('main').appendChild(cloneSuccessPopup);

    var popupSuccess = document.querySelector('.success');

    var onClosePopupClick = function () {
      popupSuccess.remove();
      popupSuccess.removeEventListener('click', onClosePopupClick);
      document.removeEventListener('keydown', onClosePopupEsc);
    };

    var onClosePopupEsc = function (evt) {
      if (evt.keyCode === window.util.escKey) {
        onClosePopupClick();
      }
    };

    popupSuccess.addEventListener('click', onClosePopupClick);
    document.addEventListener('keydown', onClosePopupEsc);

    resetMapForm();
    window.util.formAd.reset();
    window.form.resetFiledPrice();
    window.util.filterForm.reset();
    window.photo.resetPreviewPhoto();
  };

  // окно с ошибкой
  var onErrorSave = function () {
    var templateError = document.querySelector('#error').content;
    var cloneErrorPopup = templateError.cloneNode(true);
    // var p = cloneErrorPopup.querySelector('p');
    // p.textContent = message;
    document.querySelector('main').appendChild(cloneErrorPopup);
    var popupError = document.querySelector('.error');

    var onPopupErrorEscPress = function (evt) {
      if (evt.keyCode === window.util.escKey) {
        popupError.remove();
        document.removeEventListener('keydown', onPopupErrorEscPress);
      }
    };

    document.addEventListener('keydown', onPopupErrorEscPress);

    popupError.addEventListener('click', function (evt) {
      var buttonCloseClickPopup = evt.target.closest('.error__button');
      if (!buttonCloseClickPopup) {
        return;
      }
      popupError.remove();
      document.removeEventListener('keydown', onPopupErrorEscPress);
    });
  };

  window.util.formAd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.util.formAd), onSuccessSave, onErrorSave);
  });

  document.querySelector('.ad-form__reset').addEventListener('click', function () {
    mapPinMain.style.left = mapPinMainLeft;
    mapPinMain.style.top = mapPinMainTop;
    setAddressOnPinMainMove();
    window.util.formAd.reset();
    window.form.resetFiledPrice();
    window.util.filterForm.reset();
    window.photo.resetPreviewPhoto();
    showPin(adsLoad);
  });
})();
