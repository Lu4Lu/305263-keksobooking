'use strict';
(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeElement = mapFiltersForm.querySelector('#housing-type');
  var housingPriceElement = mapFiltersForm.querySelector('#housing-price');
  var housingRoomsElement = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuestsElement = mapFiltersForm.querySelector('#housing-guests');
  var housingFeatures = mapFiltersForm.querySelectorAll('.map__checkbox');

  // here are the filters
  function filterHousingType(pin) {
    switch (housingTypeElement.value) {
      case 'any':
        return true;
      default:
        return pin.offer.type === housingTypeElement.value;
    }
  }

  function filterPrice(pin) {
    var MIN_FILTER_PRICE = 10000;
    var MAX_FILTER_PRICE = 50000;
    switch (housingPriceElement.value) {
      case 'any':
        return true;
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
    switch (housingRoomsElement.value) {
      case 'any':
        return true;
      default:
        return pin.offer.rooms === parseInt(housingRoomsElement.value, 10);
    }
  }

  function filterGuests(pin) {
    switch (housingGuestsElement.value) {
      case 'any':
        return true;
      default:
        return pin.offer.guests === parseInt(housingGuestsElement.value, 10);
    }
  }

  function filterFeatures(pin) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && pin.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  }

  // take this array and map the new one with filters
  function filterPins() {
    // copy my initial array
    var newPins = window.appartments.slice();

    // filter the array
    var filteredPins = newPins.filter(function (item) {
      return filterHousingType(item) && filterPrice(item) && filterRooms(item) && filterGuests(item) && filterFeatures(item);
    });
    window.closePopup();
    // show the new array
    window.renderUserPins(filteredPins);
  }

  var debouncedFilterPins = window.debounce(filterPins);

  mapFiltersForm.addEventListener('change', debouncedFilterPins);
})();
