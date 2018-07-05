'use strict';
(function () {
  // switch to inactive mode
  function toggleInctive() {
    window.mapElement.classList.add('map--faded');
    window.formContainerElement.classList.add('ad-form--disabled');
    window.form.disableFieldsets(true);
    window.isMapActive = false;
  }

  // switch to toActive mode
  function toggleActive() {
    window.mapElement.classList.remove('map--faded');
    window.formContainerElement.classList.remove('ad-form--disabled');
    window.form.disableFieldsets(false);
    window.isMapActive = true;
  }

  window.pageMode = {
    toggleInctive: toggleInctive,
    toggleActive: toggleActive
  };
})();
