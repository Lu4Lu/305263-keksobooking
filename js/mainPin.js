'use strict';
// Main pin dragging
(function () {
  var MaxMapCoord = {
    LEFT: 0,
    TOP: 130,
    BOTTOM: 630
  };

  var MainPinInitCoord = {
    X: 570,
    Y: 375
  };

  var mainPinElement = document.querySelector('.map__pin--main');

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var limitRect = {
      top: MaxMapCoord.TOP - mainPinElement.clientHeight,
      bottom: MaxMapCoord.BOTTOM - mainPinElement.clientHeight,
      left: MaxMapCoord.LEFT,
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
      window.map.releaseMainPin();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // reset main pin to initial coords
  var resetMainPin = function () {
    mainPinElement.style.left = MainPinInitCoord.X + 'px';
    mainPinElement.style.top = MainPinInitCoord.Y + 'px';
    window.form.setAddress(mainPinElement);
  };

  window.mainPin = {
    resetMainPin: resetMainPin
  };
})();
