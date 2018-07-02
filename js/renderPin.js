'use strict';
(function renderPinAndCard() {
  var mapElement = document.querySelector('.map');
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var SHOWED_PINS_AMOUNT = 5;

  var pinsContainerElement = mapElement.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  // var pinsContainerElement = document.querySelector('.map__pins');
  // var pinElement = pinsContainerElement.querySelectorAll('.map__pin');

  function renderPin(accommodation) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = accommodation.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = accommodation.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = accommodation.author.avatar;
    pinElement.querySelector('img').alt = accommodation.offer.title;

    // set event listener for every pin element
    pinElement.addEventListener('click', function () {
      window.showCardPopup(accommodation);
    });
    return pinElement;
  }

  // delete the 'old' pins
  function deletePins() {
    var pinButtonElement = pinsContainerElement.querySelectorAll('.map__pin');

    for (var j = 1; j < pinButtonElement.length; j++) {
      pinsContainerElement.removeChild(pinButtonElement[j]);
    }
  }

  function renderUserPins(array) {
    deletePins();
    var fragment = document.createDocumentFragment();
    // for every item in array render pin
    for (var i = 0; i < SHOWED_PINS_AMOUNT; i++) {
      // here append child for every element
      fragment.appendChild(renderPin(array[i]));
    }
    pinsContainerElement.appendChild(fragment);
    window.disableFilters(false);
  }
  window.renderUserPins = renderUserPins;
})();
