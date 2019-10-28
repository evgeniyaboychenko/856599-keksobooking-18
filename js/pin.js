'use strict';
(function () {
  var templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var getMapPin = function (ad) {
    var mapPin = templateMapPin.cloneNode(true);
    mapPin.style.left = ad.location.x + 'px';
    mapPin.style.top = ad.location.y + 'px';
    var mapPinAvatar = mapPin.querySelector('img');
    mapPinAvatar.src = ad.author.avatar;
    mapPinAvatar.alt = ad.offer.title;
    return mapPin;
  };

  window.pin = {
    getMapPin: getMapPin
  };
})();
