'use strict';
(function () {
  window.errorMessageContainer = document.querySelector('.error');
  var errorMessageElement = window.errorMessageContainer.querySelector('.error__message');
  var errorMessageSpanElement = errorMessageElement.querySelector('span');

  function onError(errorMessage) {
    errorMessageSpanElement.textContent = errorMessage;
    window.errorMessageContainer.classList.remove('hidden');
  }
  window.onError = onError;
})();
