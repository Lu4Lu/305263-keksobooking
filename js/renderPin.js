'use strict';
(function () {
  var PinSize = {
    HEIGHT: 70,
    WIDTH: 50
  };

  var isPinActive = false;

  var SHOWED_PINS_AMOUNT = 5;

  var mapElement = document.querySelector('.map');

  var pinsContainerElement = mapElement.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('template').content.querySelector('.map__pin');
  var pinButtonElement = pinsContainerElement.querySelectorAll('.map__pin');

  function renderPin(accommodation) {
    var pinElement = pinTemplateElement.cloneNode(true);
    pinElement.style.left = accommodation.location.x - PinSize.WIDTH / 2 + 'px';
    pinElement.style.top = accommodation.location.y - PinSize.HEIGHT + 'px';
    pinElement.querySelector('img').src = accommodation.author.avatar;
    pinElement.querySelector('img').alt = accommodation.offer.title;
    // set event listener for every pin element
    pinElement.addEventListener('click', function () {
      window.card.showCardPopup(accommodation);
      deactivatePin();
      activatePin(pinElement);
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
  function activatePin(pinItem) {
    pinItem.classList.add('map__pin--active');
    isPinActive = true;
  }

  function deactivatePin() {
    if (isPinActive === true) {
      for (var j = 1; j < pinButtonElement.length; j++) {
        pinButtonElement.classList.remove('map__pin--active');
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
    window.filters.disableFilters(false);
  }

  window.renderPin = {
    renderUserPins: renderUserPins,
    deletePins: deletePins,
    deactivatePin: deactivatePin,
  };
})();
