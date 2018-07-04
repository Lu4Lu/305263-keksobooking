'use strict';

(function () {
  var mapElement = window.mapElement;
  var formContainerElement = window.formContainerElement;
  // var fieldsetElements = formContainerElement.querySelectorAll('fieldset');

  // switch to inactive mode
  function switchInactiveMode() {
    window.mapElement.classList.add('map--faded');
    window.formContainerElement.classList.add('ad-form--disabled');
    window.disableFieldsets(true);
    window.isMapActive = false;
  }

  // switch to toActive mode
  function switchActiveMode() {
    // mapElement.classList.remove('map--faded');
    // formContainerElement.classList.remove('ad-form--disabled');
    window.mapElement.classList.remove('map--faded');
    window.formContainerElement.classList.remove('ad-form--disabled');
    window.disableFieldsets(false);
    window.isMapActive = true;
  }

  window.pageMode = {
    toInactive: switchInactiveMode,
    toActive: switchActiveMode
  };
})();
