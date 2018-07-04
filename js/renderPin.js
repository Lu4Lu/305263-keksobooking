'use strict';
(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var SHOWED_PINS_AMOUNT = 5;

  var mapElement = document.querySelector('.map');

  var pinsContainerElement = mapElement.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  window.pinButtonElement = pinsContainerElement.querySelectorAll('.map__pin');

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
    var pinElement = pinsContainerElement.querySelectorAll('.map__pin');

    for (var j = 1; j < pinElement.length; j++) {
      pinsContainerElement.removeChild(pinElement[j]);
    }
  }

  // activate and deactivate clicked pin
  var isPinActive = false;
  function activatePin(pinItem) {
    pinItem.classList.add('map__pin--toActive');
    isPinActive = true;
  }
  function deactivatePins() {
    if (isPinActive === true) {
      for (var j = 1; j < window.pinButtonElement.length; j++) {
        window.pinButtonElement.classList.remove('map__pin--toActive');
      }
    }
    isPinActive = false;
  }

  function renderUserPins(newArray) {
    var arrayLength = newArray.length > SHOWED_PINS_AMOUNT ? SHOWED_PINS_AMOUNT : newArray.length;
    deletePins();
    var fragment = document.createDocumentFragment();
    // for every item in array render pin
    for (var i = 0; i < arrayLength; i++) {
      // here append child for every element
      fragment.appendChild(renderPin(newArray[i]));
    }
    pinsContainerElement.appendChild(fragment);
    window.disableFilters(false);
  }

  window.renderUserPins = renderUserPins;
  window.deletePins = deletePins;
  window.deactivatePins = deactivatePins;
  window.activatePin = activatePin;
})();
