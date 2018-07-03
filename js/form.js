'use strict';
(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  var adFormContainerElement = document.querySelector('.ad-form');
  var timeInField = document.querySelector('#timein');
  var timeOutFiled = document.querySelector('#timeout');
  var apartmentTypeField = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var roomNumberField = document.querySelector('#room_number');
  var capacityField = document.querySelector('#capacity');
  var fieldsetElement = adFormContainerElement.querySelectorAll('fieldset');
  var formAddressElement = adFormContainerElement.querySelector('#address');
  var resetElement = document.querySelector('.ad-form__reset');
  window.successMessageElement = document.querySelector('.success');


  var typePriceDependency = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  roomsGuestValidation();
  setMinimalPrice();

  // set address from main pin
  function setAddress(item) {
    formAddressElement.value = (parseInt(item.style.left, 10) + (MAIN_PIN_WIDTH / 2)) + ', '
      + (parseInt(item.style.left, 10) + MAIN_PIN_HEIGHT);
  }

  // disable fieldsetElement / inactive mode
  function disableFieldsets(boolean) {
    for (var i = 0; i < fieldsetElement.length; i++) {
      fieldsetElement[i].disabled = boolean;
    }
  }
  disableFieldsets(true);

  // price to apartment type dependency
  function setMinimalPrice() {
    priceField.min = typePriceDependency[apartmentTypeField.value];
    priceField.placeholder = typePriceDependency[apartmentTypeField.value];
  }

  // rooms to capacity dependencies
  function roomsGuestValidation() {
    if ((roomNumberField.value === '1') && (capacityField.value !== '1')) {
      capacityField.setCustomValidity('В одной комнате может поселиться только один гость.');
    } else if ((roomNumberField.value === '2') && (capacityField.value !== '1') && (capacityField.value !== '2')) {
      capacityField.setCustomValidity('В двух комнатах не может поселиться больше 2 гостей.');
    } else if ((roomNumberField.value === '3') && (capacityField.value !== '1') && (capacityField.value !== '2') && (capacityField.value !== '3')) {
      capacityField.setCustomValidity('В двух комнатах не может поселиться больше 3 гостей.');
    } else if ((roomNumberField.value === '100') && (capacityField.value !== '0')) {
      capacityField.setCustomValidity('Сто комнат предназначены не для гостей!');
    } else {
      capacityField.setCustomValidity('');
    }
  }

  // matching check in time with check out time
  function checkTime(evt) {
    timeInField.value = timeOutFiled.value = evt.target.value;
  }

  function resetPage() {
    showSuccessMessage();
    adFormContainerElement.reset();
    window.resetMainPin();
    if (window.isMapActive === true) {
      // activate map and form
      window.mapElement.classList.add('map--faded');
      adFormContainerElement.classList.add('ad-form--disabled');
      window.disableFieldsets(true);
      window.deletePins();
    }
    window.isMapActive = false;
  }

  function showSuccessMessage() {
    window.successMessageElement.classList.remove('hidden');
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    var formData = new FormData(adFormContainerElement);
    window.upload(formData, resetPage, window.onError);
  }

  // reset the form
  resetElement.addEventListener('click', resetPage);

  apartmentTypeField.addEventListener('change', setMinimalPrice);
  capacityField.addEventListener('change', roomsGuestValidation);
  roomNumberField.addEventListener('change', roomsGuestValidation);
  timeInField.addEventListener('change', checkTime);
  timeOutFiled.addEventListener('change', checkTime);

  window.setAddress = setAddress;
  window.onFormSubmit = onFormSubmit;
  window.disableFieldsets = disableFieldsets;
  window.resetPage = resetPage;
})();
