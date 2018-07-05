'use strict';
(function () {
  window.errorMessageContainerElement = document.querySelector('.error');
  var errorMessageElement = window.errorMessageContainerElement.querySelector('.error__message');
  var errorMessageSpanElement = errorMessageElement.querySelector('span');

  function onError(errorMessage) {
    errorMessageSpanElement.textContent = errorMessage;
    window.errorMessageContainerElement.classList.remove('hidden');
  }
  window.onError = onError;
})();
