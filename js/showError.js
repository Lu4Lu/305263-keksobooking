'use strict';
(function () {
  function onError (errorMessage) {
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
