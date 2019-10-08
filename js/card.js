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

  window.card = {
    createCardAd: createCardAd
  };
})();
