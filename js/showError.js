'use strict';
(function () {
  window.errorMessageContainerElement = document.querySelector('.error');
  var errorMessageElement = window.errorMessageContainerElement.querySelector('.error__message span');
  var errorMessageCloseButtonElement = document.querySelector('.error__message--close');

  function onError(errorMessage) {
    errorMessageElement.textContent = errorMessage;
    window.errorMessageContainerElement.classList.remove('hidden');
    errorMessageCloseButtonElement.focus();
  }
  window.onError = onError;
})();
