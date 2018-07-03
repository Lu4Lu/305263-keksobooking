'use strict';
//
// Pin interaction with web site
//
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
window.mapElement = document.querySelector('.map');
var mainPinElement = window.mapElement.querySelector('.map__pin--main');
var adFormContainerElement = document.querySelector('.ad-form');
var closeErrorMessageElement = document.querySelector('.error__message--close');

window.isMapActive = false;

// actions on main pin release
function releaseMainPin() {

  window.setAddress(mainPinElement);
  if (window.isMapActive === false) {
    // activate map and form
    window.load(
        function (data) {
          window.appartments = data;
          window.renderUserPins(data);
        },
        window.onError
    );
    window.mapElement.classList.remove('map--faded');
    adFormContainerElement.classList.remove('ad-form--disabled');
    window.disableFieldsets(false);
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

// click on main pin
mainPinElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    releaseMainPin();
  }
});

window.releaseMainPin = releaseMainPin;
