'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  // var saveURL = 'https://js.dump.academy/keksobooking';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      console.log(xhr.responseText);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', loadURL);
    xhr.send();
  };

})();

