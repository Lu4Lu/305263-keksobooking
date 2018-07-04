'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var uploadURL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var HttpStatusCode = {
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
        case HttpStatusCode.SUCCESS:
          onLoad(xhr.response);
          break;
        case HttpStatusCode.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case HttpStatusCode.USER_UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case HttpStatusCode.NOT_FOUND:
          onError('Страница не найдена');
          break;
        case HttpStatusCode.SERVER_ERROR:
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
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', loadURL);
    xhr.send();
  }

  function upload(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HttpStatusCode.SUCCESS) {
        onLoad(xhr.response);
        window.resetPage();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', uploadURL);
    xhr.send(data);
  }

  window.load = load;
  window.upload = upload;
})();

