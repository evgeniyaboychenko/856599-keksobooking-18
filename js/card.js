'use strict';
(function () {
  // создание карточки объявления от объекта метка
  var typeHouseMap = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var templateMapCard = document.querySelector('#card').content.querySelector('.map__card');
  var EndingWordRoom = {MULTIPLE: 'ы', SINGLE: 'a', ZERO: ''};
  var EndingWordGuest = {MULTIPLE: 'ей', SINGLE: 'я'};

  var getPropertyTypeName = function (key) {
    return typeHouseMap[key];
  };

  var getEndingWordRoom = function (number) {
    if ((number < 10 || number > 20) && number % 10 === 1) {
      return EndingWordRoom.SINGLE;
    } else if ((number < 10 || number > 20) && (number % 10 === 2 || number % 10 === 3 || number % 10 === 4)) {
      return EndingWordRoom.MULTIPLE;
    }
    return EndingWordRoom.ZERO;
  };

  var writeTitle = function (ad, card) {
    var mapCardTitle = card.querySelector('.popup__title');
    if (ad.offer.title) {
      mapCardTitle.textContent = ad.offer.title;
    } else {
      mapCardTitle.classList.add('visually-hidden');
    }
  };

  var writeAddress = function (ad, card) {
    var mapCardAddress = card.querySelector('.popup__text--address');
    if (ad.offer.address) {
      mapCardAddress.textContent = ad.offer.address;
    } else {
      mapCardAddress.classList.add('visually-hidden');
    }
  };

  var writePrice = function (ad, card) {
    var mapCardPrice = card.querySelector('.popup__text--price');
    if (ad.offer.price >= 0) {
      mapCardPrice.textContent = ad.offer.price + '₽/ночь';
    } else {
      mapCardPrice.classList.add('visually-hidden');
    }
  };

  var writeType = function (ad, card) {
    var mapCardType = card.querySelector('.popup__type');
    if (ad.offer.type) {
      mapCardType.textContent = getPropertyTypeName(ad.offer.type);
    } else {
      mapCardType.classList.add('visually-hidden');
    }
  };

  var writeCapacity = function (ad, card) {
    var mapCardCapacity = card.querySelector('.popup__text--capacity');
    if (ad.offer.rooms >= 0 && ad.offer.guests >= 0) {
      mapCardCapacity.textContent = ad.offer.rooms + ' комнат' + getEndingWordRoom(ad.offer.rooms) + ' для ' + ad.offer.guests + ' гост' + ((ad.offer.guests === 1) ? EndingWordGuest.SINGLE : EndingWordGuest.MULTIPLE);
    } else if (ad.offer.rooms >= 0) {
      mapCardCapacity.textContent = ad.offer.rooms + ' комнат' + getEndingWordRoom(ad.offer.rooms);
    } else if (ad.offer.guests >= 0) {
      mapCardCapacity.textContent = ' для ' + ad.offer.guests + ' гост' + ((ad.offer.guests === 1) ? EndingWordGuest.SINGLE : EndingWordGuest.MULTIPLE);
    } else {
      mapCardCapacity.classList.add('visually-hidden');
    }
  };


  var writeTime = function (ad, card) {
    var mapCardTime = card.querySelector('.popup__text--time');
    if (ad.offer.checkin && ad.offer.checkout) {
      mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else if (ad.offer.checkout) {
      mapCardTime.textContent = 'выезд до ' + ad.offer.checkout;
    } else if (ad.offer.checkin) {
      mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin;
    } else {
      mapCardTime.classList.add('visually-hidden');
    }
  };

  var writeFeatures = function (ad, card) {
    var mapCardFeatures = card.querySelector('.popup__features');
    mapCardFeatures.innerHTML = '';
    if (ad.offer.features.length !== 0) {
      ad.offer.features.forEach(function (feature) {
        var featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature');
        featureItem.classList.add('popup__feature' + '--' + feature);
        mapCardFeatures.appendChild(featureItem);
      });
    } else {
      mapCardFeatures.classList.add('visually-hidden');
    }
  };

  var writeDescription = function (ad, card) {
    var mapCardDescription = card.querySelector('.popup__description');
    if (ad.offer.description) {
      mapCardDescription.textContent = ad.offer.description;
    } else {
      mapCardDescription.classList.add('visually-hidden');
    }
  };

  var writePhotos = function (ad, card) {
    var mapCardPhotos = card.querySelector('.popup__photos');
    var mapCardPhoto = mapCardPhotos.querySelector('.popup__photo');
    if (ad.offer.photos.length !== 0) {
      mapCardPhoto.src = ad.offer.photos[0];
      ad.offer.photos.forEach(function (photo, index) {
        if (index !== 0) {
          var mapCardImage = mapCardPhoto.cloneNode(true);
          mapCardImage.src = photo;
          mapCardPhotos.appendChild(mapCardImage);
        }
      });
    } else {
      mapCardPhotos.textContent = 'Фото жилья отсутствует';
    }
  };

  var writeAvatar = function (ad, card) {
    var mapCardAvatar = card.querySelector('.popup__avatar');
    mapCardAvatar.src = ad.author.avatar;
  };

  var createCardAd = function (ad) {
    var mapCard = templateMapCard.cloneNode(true);
    writeTitle(ad, mapCard);
    writeAddress(ad, mapCard);
    writePrice(ad, mapCard);
    writeType(ad, mapCard);
    writeCapacity(ad, mapCard);
    writeTime(ad, mapCard);
    writeFeatures(ad, mapCard);
    writeDescription(ad, mapCard);
    writePhotos(ad, mapCard);
    writeAvatar(ad, mapCard);
    return mapCard;
  };

  window.card = {
    createCardAd: createCardAd
  };
})();
