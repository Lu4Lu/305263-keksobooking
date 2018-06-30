'use strict';
(function () {

  var MIN_FILTER_PRICE = 10000;
  var MAX_FILTER_PRICE = 50000;
  var newPins = [];

  var mapFiltersForm = document.querySelector('.map__filters');

  // here are filters
  function filterHousingType(pin) {
    var housingTypeElement = mapFiltersForm.querySelector('#housing-type');
    switch (housingTypeElement.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.type === housingTypeElement.value;
    }
  }

  function filterPrice(pin) {
    var housingPriceElement = mapFiltersForm.querySelector('#housing-price');
    switch (housingPriceElement.value) {
      case 'any':
        return pin;
      case 'low':
        return pin.offer.price <= MIN_FILTER_PRICE;
      case 'middle':
        return pin.offer.price >= MIN_FILTER_PRICE && pin.offer.price <= MAX_FILTER_PRICE;
      case 'high':
        return pin.offer.price >= MAX_FILTER_PRICE;
      default:
        return pin.offer.price === housingPriceElement.value;
    }
  }

  function filterRooms(pin) {
    var housingRoomsElement = mapFiltersForm.querySelector('#housing-rooms');
    switch (housingRoomsElement.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.rooms === parseInt(housingRoomsElement.value, 10);
    }
  }

  function filterGuests(pin) {
    var housingGuestsElement = mapFiltersForm.querySelector('#housing-guests');
    switch (housingGuestsElement.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.guests === parseInt(housingGuestsElement.value, 10);
    }
  }

  function filterFeatures(pin) {
    var housingFeatures = mapFiltersForm.querySelectorAll('.map__checkbox');

    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && pin.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  }

  function deletePins() {
    var pinsContainerElement = document.querySelector('.map__pins');
    var pinElement = pinsContainerElement.querySelectorAll('.map__pin');
    //
    // pinsContainerElement.forEach(function (pin) {
    //   pinsContainerElement.removeChild(pin);
    // });
    for (var i = 1; i < pinElement.length; i++) {
      pinsContainerElement.removeChild(pinElement[i]);
    }
  }

  // take this array and map the new one with filters
  function filterPins() {
    // copy my initial array
    newPins = window.appartments.slice();

    // filter the array
    var filteredPins = newPins.filter(filterHousingType).filter(filterPrice)
      .filter(filterRooms).filter(filterGuests).filter(filterFeatures);

    window.closePopup();
    deletePins();
    // show the new array
    window.renderUserPins(filteredPins);
  }

  var onFiltersChange = function () {
    window.debounce(filterPins, window.debounce.DEBOUNCE_INTERVAL);
  };

  // render filtered pins

  // console.log(filteredPins);

  mapFiltersForm.addEventListener('change', onFiltersChange);
})();
