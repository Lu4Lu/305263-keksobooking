'use strict';
(function renderPinAndCard() {
  var mapElement = document.querySelector('.map');
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var pinsContainerElement = mapElement.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

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

  function renderUserPins() {
    var fragment = document.createDocumentFragment();
    // for every item in array render pin
    window.appartments.forEach(function (apartment) {
      fragment.appendChild(renderPin(apartment));
    });
    pinsContainerElement.appendChild(fragment);
  }
  window.renderUserPins = renderUserPins;
})();
