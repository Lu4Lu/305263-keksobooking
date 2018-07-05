'use strict';
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters');
  var housingTypeElement = mapFiltersContainer.querySelector('#housing-type');
  var housingPriceElement = mapFiltersContainer.querySelector('#housing-price');
  var housingRoomsElement = mapFiltersContainer.querySelector('#housing-rooms');
  var housingGuestsElement = mapFiltersContainer.querySelector('#housing-guests');
  var housingFeatures = mapFiltersContainer.querySelectorAll('.map__checkbox');

  var FilterPrice = {
    MIN: 10000,
    MAX: 50000
  };

  // disable filters / inactive mode
  function disableFilters(boolean) {
    var filterElements = mapFiltersContainer.children;
    for (var i = 0; i < filterElements.length; i++) {
      filterElements[i].disabled = boolean;
    }
  }
  disableFilters(true);

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
    switch (housingPriceElement.value) {
      case 'any':
        return true;
      case 'low':
        return pin.offer.price <= FilterPrice.MIN;
      case 'middle':
        return pin.offer.price >= FilterPrice.MIN && pin.offer.price <= FilterPrice.MAX;
      case 'high':
        return pin.offer.price >= FilterPrice.MAX;
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
    window.card.closePopup();
    // show the new array
    window.renderPin.renderUserPins(filteredPins);
  }

  var debouncedFilterPins = window.debounce(filterPins);

  window.filters = {
    disableFilters: disableFilters
  };

  mapFiltersContainer.addEventListener('change', debouncedFilterPins);
})();
