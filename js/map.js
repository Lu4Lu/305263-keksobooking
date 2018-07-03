'use strict';
//
// Pin interaction with web site
//
var ESC_KEYCODE = 27;
window.mapElement = document.querySelector('.map');
var mainPinElement = window.mapElement.querySelector('.map__pin--main');
var adFormContainerElement = document.querySelector('.ad-form');
var closeErrorMessageElement = document.querySelector('.error__message--close');

window.isMapActive = false;

window.appartments = [];
// actions on main pin release
function releaseMainPin() {
  window.load(
      function (data) {
        window.appartments = data;
      },
      window.onError
  );
  window.setAddress(mainPinElement);
  if (window.isMapActive === false) {
    // activate map and form
    window.mapElement.classList.remove('map--faded');
    adFormContainerElement.classList.remove('ad-form--disabled');
    window.disableFieldsets(false);
    window.renderUserPins(window.appartments);
  }
  window.isMapActive = true;
}

function closeSuccessMessage() {
  window.successMessageElement.classList.add('hidden');
}

function closeErrorMessage() {
  window.errorMessageContainer.classList.add('hidden');
}

// close card by esc press
window.mapElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    window.closePopup();
  }
});

closeErrorMessageElement.addEventListener('click', function () {
  closeSuccessMessage();
});

adFormContainerElement.addEventListener('submit', window.onFormSubmit, window.onError);

document.addEventListener('click', function () {
  closeSuccessMessage();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSuccessMessage();
  }
});

closeErrorMessageElement.addEventListener('click', function () {
  closeErrorMessage();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeErrorMessage();
  }
});

window.releaseMainPin = releaseMainPin;
