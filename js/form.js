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

  // ************************************
  // Form validation
  //
  var typePriceDependency = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  roomsGuestValidation();
  setMinimalPrice();

  // set address from main pin
  function setAddress(mainPinElement) {
    formAddressElement.value = (parseInt(mainPinElement.style.left, 10) + (MAIN_PIN_WIDTH / 2)) + ', '
      + (parseInt(mainPinElement.style.left, 10) + MAIN_PIN_HEIGHT);
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
      capacityField.setCustomValidity('В одном комнате может поселиться только один гость.');
      // capacityField.forEach(function (option) {
      //   if (capacityField.value !== '1') {
      //     capacityField[option].disabled = true;
      //   }
      // });
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

  function resetForm() {
    adFormContainerElement.reset();
  }

  function showSuccessMessage() {
    window.successMessageElement.classList.remove('hidden');
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.upload(new FormData(adFormContainerElement), resetForm, window.onError);
    showSuccessMessage();
  }

  // reset the form
  resetElement.addEventListener('click', resetForm);

  apartmentTypeField.addEventListener('change', setMinimalPrice);
  capacityField.addEventListener('change', roomsGuestValidation);
  roomNumberField.addEventListener('change', roomsGuestValidation);
  timeInField.addEventListener('change', checkTime);
  timeOutFiled.addEventListener('change', checkTime);

  window.setAddress = setAddress;
  window.onFormSubmit = onFormSubmit;
  window.disableFieldsets = disableFieldsets;
})();
