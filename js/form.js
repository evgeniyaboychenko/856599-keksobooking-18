'use strict';
(function () {
  // -----------------------валидация формы-------------------------
  var houseMinPriceMap = {palace: 10000, flat: 1000, house: 5000, bungalo: 0};
  var typeHouseField = window.util.formAd.querySelector('select[name="type"]');
  var priceField = window.util.formAd.querySelector('input[name="price"]');
  var timeInField = window.util.formAd.querySelector('select[name="timein"]');
  var timeOutField = window.util.formAd.querySelector('select[name="timeout"]');

  // валидация Заголовок объявления
  var roomField = window.util.formAd.querySelector('select[name="rooms"]');
  var guestField = window.util.formAd.querySelector('select[name="capacity"]');

  var checkedTitleFields = function () {
    var titleField = window.util.formAd.querySelector('input[name="title"]');
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

  // стоимость по типу жилья

  var onPriceFieldValidation = function (field) {
    if (field.validity.valueMissing) {
      field.setCustomValidity('Введите цену');
    } else if (field.validity.stepMismatch) {
      field.setCustomValidity('Цена не соответствует шагу в 10');
    } else if (field.validity.rangeOverflow) {
      field.setCustomValidity('Стоимость не может быть больше 1000000');
    } else {
      field.setCustomValidity('');
    }
  };

  var determinateMinPriceHouse = function () {
    priceField.setAttribute('placeholder', houseMinPriceMap[typeHouseField.value]);
    priceField.setAttribute('min', houseMinPriceMap[typeHouseField.value]);
  };

  var checkedPriceFields = function () {
    if (priceField.value < houseMinPriceMap[typeHouseField.value]) {
      priceField.setCustomValidity('Минимальная стоимость для выбранного типа жилья должна быть выше ' + houseMinPriceMap[typeHouseField.value]);
    } else {
      priceField.setCustomValidity('');
    }
  };

  var onMinPriceFieldValidation = function () {
    determinateMinPriceHouse();
    checkedPriceFields();
  };

  // проверка соответствия комнат кол-ву гостей
  var onGuestsFieldValidation = function () {
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

  // соответствие время выезда времени въезда
  var matchFields = function (fieldFirst, fieldSecond) {
    fieldFirst.addEventListener('change', function () {
      fieldSecond.value = fieldFirst.value;
    });
  };

  checkedTitleFields();
  priceField.addEventListener('invalid', onPriceFieldValidation(priceField));

  determinateMinPriceHouse();
  typeHouseField.addEventListener('change', onMinPriceFieldValidation);
  priceField.addEventListener('change', onMinPriceFieldValidation);

  onGuestsFieldValidation();
  roomField.addEventListener('change', onGuestsFieldValidation);
  guestField.addEventListener('change', onGuestsFieldValidation);

  matchFields(timeInField, timeOutField);
  matchFields(timeOutField, timeInField);

  window.form = {
    resetFiledPrice: determinateMinPriceHouse
  };
})();
