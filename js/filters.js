'use strict';
(function () {

  // var MIN_FILTER_PRICE = 10000;
  // var MAX_FILTER_PRICE = 50000;
  var newPins = [];

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeElement = mapFiltersForm.querySelector('#housing-type');

  // window.appartments = [];
  // window.load(
  //   function (data) {
  //     window.appartments = data;
  //   },
  //   window.onError
  // );

  // copy my initial array
  // render first the basic pins array from data

  // compare the filter of the element and push this element to the array
  // show the new array


  // window.renderUserPins();

  // here are filters
  function filterHousingType(pin) {
    switch (housingTypeElement.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.type === housingTypeElement.value;
    }
  }

  function deletePins() {
    var pinsContainerElement = document.querySelector('.map__pins');
    var pinElement = pinsContainerElement.querySelectorAll('.map__pin');

    // pinsContainerElement.forEach(pin) {
    //   pinsContainerElement.removeChild(pinElement[i])
    // }
    for (var i = 1; i < pinElement.length; i++) {
      pinsContainerElement.removeChild(pinElement[i]);
    }
  }

  // take this array and map the new one with filters
  function filteredPins() {
    newPins = window.appartments.slice();

    var filtered = newPins.filter(filterHousingType);

    // var houseType = newPins.filter(function (it) {
    //   return it.offer.type === housingTypeElement.value;
    // });

    deletePins();
    window.renderUserPins(filtered);
  }

  // render filtered pins

  // console.log(filteredPins);

  mapFiltersForm.addEventListener('change', filteredPins);
})();
