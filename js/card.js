'use strict';
(function () {
  // создание карточки объявления от объекта метка
  var TYPE_HOUSES_MAP = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};

  var templateMapCard = document.querySelector('#card').content.querySelector('.map__card');

  var getPropertyTypeName = function (key) {
    return TYPE_HOUSES_MAP[key];
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

  var createCardAd = function (ad) {
    var mapCard = templateMapCard.cloneNode(true);
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

    if (ad.offer.title) {
      mapCardTitle.textContent = ad.offer.title;
    } else {
      mapCardTitle.classList.add('visually-hidden');
    }

    if (ad.offer.address) {
      mapCardAddress.textContent = ad.offer.address;
    } else {
      mapCardAddress.classList.add('visually-hidden');
    }

    if (ad.offer.price >= 0) {
      mapCardPrice.textContent = ad.offer.price + '₽/ночь';
    } else {
      mapCardPrice.classList.add('visually-hidden');
    }

    if (ad.offer.type) {
      mapCardType.textContent = getPropertyTypeName(ad.offer.type);
    } else {
      mapCardType.classList.add('visually-hidden');
    }

    if (ad.offer.rooms >= 0 && ad.offer.guests >= 0) {
      mapCardCapacity.textContent = ad.offer.rooms + ' комнат' + getEndingWordRoom(ad.offer.rooms) + ' для ' + ad.offer.guests + ' гост' + ((ad.offer.guests === 1) ? 'я' : 'ей');
    } else if (ad.offer.rooms >= 0) {
      mapCardCapacity.textContent = ad.offer.rooms + ' комнат' + getEndingWordRoom(ad.offer.rooms);
    } else if (ad.offer.guests >= 0) {
      mapCardCapacity.textContent = ' для ' + ad.offer.guests + ' гост' + ((ad.offer.guests === 1) ? 'я' : 'ей');
    } else {
      mapCardCapacity.classList.add('visually-hidden');
    }

    if (ad.offer.checkin && ad.offer.checkout) {
      mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else if (ad.offer.checkout) {
      mapCardTime.textContent = 'выезд до ' + ad.offer.checkout;
    } else if (ad.offer.checkin) {
      mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin;
    } else {
      mapCardTime.classList.add('visually-hidden');
    }

    mapCardFeatures.innerHTML = '';
    if (ad.offer.features.length !== 0) {
      for (var j = 0; j < ad.offer.features.length; j++) {
        var feature = ad.offer.features[j];
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature' + '--' + feature);
        mapCardFeatures.appendChild(featureElement);
      }
    } else {
      mapCardFeatures.classList.add('visually-hidden');
    }

    if (ad.offer.description) {
      mapCardDescription.textContent = ad.offer.description;
    } else {
      mapCardDescription.classList.add('visually-hidden');
    }

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

  window.card = {
    createCardAd: createCardAd
  };
})();
