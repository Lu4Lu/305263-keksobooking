'use strict';
window.mapElement = document.querySelector('.map');
var isMapActive = false;
//
// Pin interaction with web site
//
//
var ESC_KEYCODE = 27;


var mainPinElement = window.mapElement.querySelector('.map__pin--main');
var adFormContainerElement = document.querySelector('.ad-form');

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

//
// Main pin dragging.
//
var MAX_MAP_LEFT = 0;
var MAX_MAP_TOP = 130;
var MAX_MAP_BOTTOM = 630;

(function () {

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var limitRect = {
      top: MAX_MAP_TOP - mainPinElement.clientHeight,
      bottom: MAX_MAP_BOTTOM - mainPinElement.clientHeight,
      left: MAX_MAP_LEFT,
      right: window.mapElement.clientWidth - mainPinElement.clientWidth
    };

    var mapShiftLeft = window.mapElement.getBoundingClientRect().left;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // вычитаем размеры чтобы курсор был всегда по центру. иначе будет баг перепрыгивания на краях left и top
      var top = moveEvt.pageY - mainPinElement.clientHeight / 2;
      var left = moveEvt.pageX - mainPinElement.clientWidth / 2 - mapShiftLeft;

      if (top <= limitRect.top) {
        top = limitRect.top;
      } else if (top >= limitRect.bottom) {
        top = limitRect.bottom;
      }
      if (left <= limitRect.left) {
        left = limitRect.left;
      } else if (left >= limitRect.right) {
        left = limitRect.right;
      }
      mainPinElement.style.top = top + 'px';
      mainPinElement.style.left = left + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      releaseMainPin();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
