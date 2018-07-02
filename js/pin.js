'use strict';
//
// Main pin dragging.
//
(function () {
  var MAX_MAP_LEFT = 0;
  var MAX_MAP_TOP = 130;
  var MAX_MAP_BOTTOM = 630;

  var mainPinElement = document.querySelector('.map__pin--main');

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

      window.releaseMainPin();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
