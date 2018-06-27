'use strict';
//
// Pin interaction with web site
//
var ESC_KEYCODE = 27;
window.mapElement = document.querySelector('.map');
var mainPinElement = window.mapElement.querySelector('.map__pin--main');
var adFormContainerElement = document.querySelector('.ad-form');
var isMapActive = false;

window.appartments = [];
window.load(
    function (data) {
      window.appartments = data;
    },
    window.onError
);

// actions on main pin release
function releaseMainPin() {
  window.setAddress(mainPinElement);
  if (isMapActive === false) {
    // activate map and form
    window.mapElement.classList.remove('map--faded');
    adFormContainerElement.classList.remove('ad-form--disabled');
    window.disableFieldsets(false);
    window.renderUserPins();
  }

  isMapActive = true;
}

// close card by esc press
window.mapElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    window.closePopup();
  }
});

adFormContainerElement.addEventListener('submit', window.onFormSubmit, window.onError);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    window.successMessageElement.classList.add('hidden');
  }
});

window.releaseMainPin = releaseMainPin;
