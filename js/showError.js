'use strict';
(function () {
  window.errorMessageContainer = document.querySelector('.error');
  var errorMessageElement = window.errorMessageContainer.querySelector('.error__message');
  var errorMessageSpanElement = errorMessageElement.querySelector('span');

  function onError(errorMessage) {
    window.errorMessageContainer.classList.remove('hidden');
    errorMessageSpanElement.textContent = errorMessage;
  }
  window.onError = onError;
})();
