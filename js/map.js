'use strict';
//
// Pin interaction with web site
//
(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  window.mapElement = document.querySelector('.map');
  var mainPinElement = window.mapElement.querySelector('.map__pin--main');
  window.formContainerElement = document.querySelector('.ad-form');
  var closeErrorMessageElement = document.querySelector('.error__message--close');

  window.isMapActive = false;

  // actions on main pin release
  function releaseMainPin() {
    window.form.setAddress(mainPinElement);
    // load data and render pins
    if (window.isMapActive === false) {
      window.backend.load(
          function (data) {
            window.appartments = data;
            window.renderPin.renderUserPins(data);
          },
          window.onError
      );
      window.pageMode.toggleActive();
    }
  }

  function closeSuccessMessage() {
    window.successMessageElement.classList.add('hidden');
  }

  function closeErrorMessage() {
    window.errorMessageContainerElement.classList.add('hidden');
  }

  // close card by esc press
  window.mapElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === Keycode.ESC) {
      window.card.closePopup();
    }
  });

  closeErrorMessageElement.addEventListener('click', function () {
    closeSuccessMessage();
  });

  window.formContainerElement.addEventListener('submit', window.form.onFormSubmit, window.onError);

  document.addEventListener('click', function () {
    closeSuccessMessage();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === Keycode.ESC) {
      closeSuccessMessage();
    }
  });

  closeErrorMessageElement.addEventListener('click', function () {
    closeErrorMessage();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === Keycode.ESC) {
      closeErrorMessage();
    }
  });

  // click on main pin
  mainPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === Keycode.ENTER) {
      releaseMainPin();
    }
  });

  window.map = {
    releaseMainPin: releaseMainPin
  };
})();
