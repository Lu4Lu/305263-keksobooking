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

    // xhr.addEventListener('load', function () {
    //   var error;
    //   switch (xhr.status) {
    //     case 200:
    //       onLoad(xhr.response);
    //       break;
    //     case 400:
    //       error = 'Неверный запрос';
    //       break;
    //     case 401:
    //       error = 'Пользователь не авторизован';
    //       break;
    //     case 404:
    //       error = 'Ничего не найдено';
    //       break;
    //     default:
    //       error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    //   }
    //
    //   if (error) {
    //     onError(error);
    //   }
    // });

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
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', loadURL);
    xhr.send();
  }
  window.load = load;

  function upload(data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', uploadURL);
    xhr.send(data);
  }
  window.upload = upload;

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin-left: -150px; margin-top: -100px; text-align: center; background-color: red; border-radius: 10px; width: 300px; height: 200px; padding-top: 50px; color: #fff; box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);';
    node.style.position = 'absolute';
    node.style.left = '50%';
    node.style.top = '50%';
    node.style.fontSize = '20px';

    node.textContent = 'Ошибка! ' + errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }
  window.onError = onError;

})();

