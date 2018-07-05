'use strict';
(function () {

  var MainPinSize = {
    WIDTH: 62,
    HEIGHT: 84
  };

  var formContainerElement = document.querySelector('.ad-form');
  var timeInFieldElement = document.querySelector('#timein');
  var timeOutFiledElement = document.querySelector('#timeout');
  var apartmentTypeFieldElement = document.querySelector('#type');
  var priceFieldElement = document.querySelector('#price');
  var roomNumberFieldElement = document.querySelector('#room_number');
  var capacityFieldElement = document.querySelector('#capacity');
  var fieldsetElement = formContainerElement.querySelectorAll('fieldset');
  var formAddressElement = formContainerElement.querySelector('#address');
  var resetButtonElement = document.querySelector('.ad-form__reset');

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
    formAddressElement.value = (parseInt(item.style.left, 10) + (MainPinSize.WIDTH / 2)) + ', '
      + (parseInt(item.style.left, 10) + MainPinSize.HEIGHT);
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
    priceFieldElement.min = typePriceDependency[apartmentTypeFieldElement.value];
    priceFieldElement.placeholder = typePriceDependency[apartmentTypeFieldElement.value];
  }

  // rooms to capacity dependencies
  function roomsGuestValidation() {
    var rooms = roomNumberFieldElement.value;
    var capacity = capacityFieldElement.value;
    var message;
    if ((rooms === '1') && (capacity !== '1')) {
      message = 'В одной комнате может поселиться только один гость.';
    } else if ((rooms === '2') && (capacityFieldElement.value !== '1') && (capacityFieldElement.value !== '2')) {
      message = 'В двух комнатах не может поселиться больше 2 гостей.';
    } else if ((rooms === '3') && (capacityFieldElement.value !== '1') && (capacityFieldElement.value !== '2') && (capacityFieldElement.value !== '3')) {
      message = 'В двух комнатах не может поселиться больше 3 гостей.';
    } else if ((rooms === '100') && (capacityFieldElement.value !== '0')) {
      message = 'Сто комнат предназначены не для гостей!';
    } else {
      message = '';
    }
    capacityFieldElement.setCustomValidity(message);
  }

  // matching check in time with check out time
  function checkTime(evt) {
    timeInFieldElement.value = timeOutFiledElement.value = evt.target.value;
  }

  function resetPage() {
    showSuccessMessage();
    formContainerElement.reset();
    window.mainPin.resetMainPin();
    if (window.isMapActive === true) {
      window.pageMode.toggleInactive();
      window.renderPin.deletePins();
      // window.
    }
    window.isMapActive = false;
  }

  function showSuccessMessage() {
    window.successMessageElement.classList.remove('hidden');
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    var formData = new FormData(formContainerElement);
    window.backend.upload(formData, resetPage, window.onError);
  }

  // reset the form
  resetButtonElement.addEventListener('click', resetPage);

  apartmentTypeFieldElement.addEventListener('change', setMinimalPrice);
  capacityFieldElement.addEventListener('change', roomsGuestValidation);
  roomNumberFieldElement.addEventListener('change', roomsGuestValidation);
  timeInFieldElement.addEventListener('change', checkTime);
  timeOutFiledElement.addEventListener('change', checkTime);

  window.form = {
    setAddress: setAddress,
    onFormSubmit: onFormSubmit,
    disableFieldsets: disableFieldsets,
  };
})();
