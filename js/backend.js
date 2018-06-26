'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var uploadURL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var httpStatusCodes = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    USER_UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case httpStatusCodes.SUCCESS:
          onLoad(xhr.response);
          break;
        case httpStatusCodes.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case httpStatusCodes.USER_UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case httpStatusCodes.NOT_FOUND:
          onError('Страница не найдена');
          break;
        case httpStatusCodes.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', loadURL);
    xhr.send();
  }

  function upload(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case httpStatusCodes.SUCCESS:
          onLoad(xhr.response);
          break;
        case httpStatusCodes.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      window.onError('Произошла ошибка соединения');
    });

    xhr.open('POST', uploadURL);
    xhr.send(data);
  }

  window.load = load;
  window.upload = upload;
})();

