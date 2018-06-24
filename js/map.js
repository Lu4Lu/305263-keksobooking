'use strict';
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var mapElement = document.querySelector('.map');

var pinsContainerElement = mapElement.querySelector('.map__pins');

var pinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

var similarCardTemplate = document.querySelector('template')
  .content
  .querySelector('.map__card');


function renderPin(accommodation) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = accommodation.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = accommodation.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = accommodation.author.avatar;
  pinElement.querySelector('img').alt = accommodation.offer.title;

  // set event listener for every pin element
  pinElement.addEventListener('click', function () {
    showCardPopup(accommodation);
  });
  return pinElement;
}

function renderPhotos(containerElement, photos) {
  // 3. создать переменную photoTemplate (клонируем туда элемент фото)
  var photoTemplate = containerElement.querySelector('.popup__photo');
  // 4. очистить от детей photosElement ( photosElement.innerHTML = ''; )
  containerElement.innerHTML = '';
  // 5.  обход цикла offer.offer.photos
  photos.forEach(function (photo) {
    // 6. в цикле клонируем photoTemplate
    var photoElement = photoTemplate.cloneNode(true);
    // console.log(photo);
    // 7. задаем src
    photoElement.src = photo;
    // 8. делаем append в photosElement
    containerElement.appendChild(photoElement);
  });
}

function renderFeatures(containerElement, features) {
  // 2. clean it
  containerElement.innerHTML = '';
  // 4. start cycle for ... clone template element
  features.forEach(function (feature) {
    // 3. set a template element
    var featureElement = document.createElement('li');
    // 5. set class popup-feature--{{...}}
    featureElement.className = 'popup__feature popup__feature--' + feature;
    // 6. append element
    containerElement.appendChild(featureElement);
  });
}

function renderCard(accommodation) {

  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = accommodation.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = accommodation.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = accommodation.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = accommodation.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = accommodation.offer.rooms + '  комнаты для ' + accommodation.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + accommodation.offer.checkin + ', выезд до ' + accommodation.offer.checkin + '.';
  cardElement.querySelector('.popup__description').textContent = accommodation.offer.description;

  var featuresContainerElement = cardElement.querySelector('.popup__features');
  renderFeatures(featuresContainerElement, accommodation.offer.features);

  // 1. Создать функцию добавления фоток (передаем туда newPopupElement и список фотографий)
  var photosContainerElement = cardElement.querySelector('.popup__photos');
  renderPhotos(photosContainerElement, accommodation.offer.photos);

  cardElement.querySelector('.popup__avatar').src = accommodation.author.avatar;

  // close card by mouse click on setupClose
  cardElement.querySelector('.popup__close').addEventListener('click', closePopup);

  return cardElement;
}

function renderUserPins() {
  var fragment = document.createDocumentFragment();
  // for every item in array render pin
  window.appartments.forEach(function (apartment) {
    fragment.appendChild(renderPin(apartment));
  });
  pinsContainerElement.appendChild(fragment);
}

// function renderUserCards(pinItem) {
//   var cardElement = renderCard(pinItem);
//   mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
// };

// ************************************
// Pin interaction with web site
//
//
var ESC_KEYCODE = 27;

var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;

var mainPinElement = mapElement.querySelector('.map__pin--main');
var adFormContainerElement = document.querySelector('.ad-form');
var fieldsetElement = adFormContainerElement.querySelectorAll('fieldset');
var formAddressElement = adFormContainerElement.querySelector('#address');

// disable fieldsetElement / inactive mode
function disableFieldsets(boolean) {
  for (var i = 0; i < fieldsetElement.length; i++) {
    fieldsetElement[i].disabled = boolean;
  }
}

disableFieldsets(true);

// set address from main pin
function setAddress() {
  formAddressElement.value = (parseInt(mainPinElement.style.left, 10) + (MAIN_PIN_WIDTH / 2)) + ', ' + (parseInt(mainPinElement.style.left, 10) + MAIN_PIN_HEIGHT);
}

// actions on main pin release
function releaseMainPin(evt) {
  // unable map
  mapElement.classList.remove('map--faded');
  adFormContainerElement.classList.remove('ad-form--disabled');

  setAddress(evt);
  disableFieldsets(false);

  // push pins
  renderUserPins();
}

// map unabling on mouseup
mainPinElement.addEventListener('mouseup', releaseMainPin);

// show matching card to every pin
var cardElement;

function showCardPopup(pinItem) {
  closePopup();
  // renderUserCards (pinItem);
  cardElement = renderCard(pinItem);
  mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
}

//
function closePopup() {
  // if a card already exists - remove it
  if (cardElement) {
    cardElement.remove();
  }
}

// close card by esc press
mapElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
});

// ************************************
// Form validation
(function () {
  var timeInField = document.querySelector('#timein');
  var timeOutFiled = document.querySelector('#timeout');
  var apartmentTypeField = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var roomNumberField = document.querySelector('#room_number');
  var capacityField = document.querySelector('#capacity');

  var typePriceDependency = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  roomsGuestValidation();
  setMinimalPrice();

  // price to apartment type dependency
  function setMinimalPrice() {
    priceField.min = typePriceDependency[apartmentTypeField.value];
    priceField.placeholder = typePriceDependency[apartmentTypeField.value];
  }

  // rooms to capacity dependencies
  function roomsGuestValidation() {
    if ((roomNumberField.value === '1') && (capacityField.value !== '1')) {
      capacityField.setCustomValidity('В одном комнате может поселиться только один гость.');
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

  apartmentTypeField.addEventListener('change', setMinimalPrice);
  capacityField.addEventListener('change', roomsGuestValidation);
  roomNumberField.addEventListener('change', roomsGuestValidation);
  timeInField.addEventListener('change', checkTime);
  timeOutFiled.addEventListener('change', checkTime);
})();

//
// Main pin dragging.
//
var MAX_MAP_LEFT = 0;
var MAX_MAP_TOP = 130;
var MAX_MAP_BOTTOM = 630;

(function () {

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var limitRect = {
      top: MAX_MAP_TOP - mainPinElement.clientHeight,
      bottom: MAX_MAP_BOTTOM - mainPinElement.clientHeight,
      left: MAX_MAP_LEFT,
      right: mapElement.clientWidth - mainPinElement.clientWidth
    };

    var mapShiftLeft = mapElement.getBoundingClientRect().left;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // вычитаем размеры чтобы курсор был всегда по центру. иначе будет баг перепрыгивания на краях left и top
      var top = moveEvt.pageY - mainPinElement.clientHeight / 2;
      var left = moveEvt.pageX - mainPinElement.clientWidth / 2 - mapShiftLeft;

      if (top <= limitRect.top) {
        top = limitRect.top;
      } else if (top >= limitRect.bottom) {
        top = limitRect.bottom;
      }
      if (left <= limitRect.left) {
        left = limitRect.left;
      } else if (left >= limitRect.right) {
        left = limitRect.right;
      }
      mainPinElement.style.top = top + 'px';
      mainPinElement.style.left = left + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
