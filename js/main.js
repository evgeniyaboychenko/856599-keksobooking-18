'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var widthMapMain = mapPinMain.clientWidth;
  var heightMapMain = mapPinMain.clientHeight;
  var addressField = window.util.formAd.querySelector('input[name="address"]');
  var adFormFieldsetList = window.util.formAd.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var filterFormFieldsetList = filterForm.querySelectorAll('fieldset');
  var filterFormSelectList = filterForm.querySelectorAll('select');

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

  // вычисление координат середины Main метки
  var setAddressMapMain = function () {
    var xMapMain = parseInt(mapPinMain.style.left, 10) + Math.round(widthMapMain / 2);
    var yMapMain = parseInt(mapPinMain.style.top, 10) + Math.round(heightMapMain / 2);
    addressField.setAttribute('value', xMapMain + ', ' + yMapMain);
  };

  // вычисление координат Main метки с концом
  var setAddressOnMapMainMove = function () {
    var xMapMain = parseInt(mapPinMain.style.left, 10) + Math.round(widthMapMain / 2);
    var yMapMain = parseInt(mapPinMain.style.top, 10) + heightMapMain + 22;
    addressField.setAttribute('value', xMapMain + ', ' + yMapMain);
  };
  // ----------------------------------------------------------------------------

  // активация формы при нажатии Enter на главную метку
  var onActiveFormPressEnter = function (evt) {
    if (evt.keyCode === window.util.enterKey) {
      onActiveForm(evt);
    }
  };

  // активация формы
  var onActiveForm = function (evt) {
    window.util.windowMap.classList.remove('map--faded');
    window.util.formAd.classList.remove('ad-form--disabled');
    window.util.mapPins.appendChild(window.map.addAds());
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

  setAddressMapMain();
  setDisabledForm();
  addListenerActMapMain();
})();
