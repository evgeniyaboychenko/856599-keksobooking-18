'use strict';
(function () {
  var onStatusConnectionServer = function (xhr, onLoad, onError) {
    var error;
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Статус ответа' + xhr.status + ' ' + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  };

  var sendRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onStatusConnectionServer(xhr, onLoad, onError);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var url = 'https://js.dump.academy/keksobooking/data';
    sendRequest(url, 'GET', onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    var url = 'https://js.dump.academy/keksobooking';
    sendRequest(url, 'POST', onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
