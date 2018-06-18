'use strict';
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var mapElement = document.querySelector('.map');
// mapElement.classList.remove('map--faded');

var pinsContainerElement = mapElement.querySelector('.map__pins');

var pinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

var similarCardTemplate = document.querySelector('template')
  .content
  .querySelector('.map__card');


var renderPin = function (accomodation) {

  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = accomodation.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = accomodation.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = accomodation.author.avatar;
  pinElement.querySelector('img').alt = accomodation.offer.title;

  // set event listener for every pin element
  pinElement.addEventListener('click', function () {
    showCardPopup(accomodation);
  });

  return pinElement;

};

var renderPhotos = function (containerElement, photos) {
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
};

var renderFeatures = function (containerElement, features) {
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
};

var renderCard = function (accomodation) {

  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = accomodation.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = accomodation.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = accomodation.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = accomodation.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = accomodation.offer.rooms + '  комнаты для ' + accomodation.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + accomodation.offer.checkin + ', выезд до ' + accomodation.offer.checkin + '.';
  cardElement.querySelector('.popup__description').textContent = accomodation.offer.description;

  var featuresContainerElement = cardElement.querySelector('.popup__features');
  renderFeatures(featuresContainerElement, accomodation.offer.features);

  // 1. Создать функцию добавления фоток (передаем туда newPopupElement и список фотографий)
  var photosContainerElement = cardElement.querySelector('.popup__photos');
  renderPhotos(photosContainerElement, accomodation.offer.photos);

  cardElement.querySelector('.popup__avatar').src = accomodation.author.avatar;

  // close card by mouse click on setupClose
  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    closePopup();
  });

  return cardElement;
};

var renderUserPins = function () {
  var fragment = document.createDocumentFragment();
  // for every item in array render pin
  window.appartments.forEach(function (appartment) {
    fragment.appendChild(renderPin(appartment));
  });
  pinsContainerElement.appendChild(fragment);
};

// var renderUserCards = function (pinItem) {
//   var cardElement = renderCard(pinItem);
//   mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
// };

//
// Pin interaction with web site
//
//
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;

var mapPinMain = mapElement.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var formAddress = adForm.querySelector('#address');
var mapPinMainRect = mapPinMain.getBoundingClientRect();

// disable fieldsets / inactive mode
var disableFieldsets = function (boolean) {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = boolean;
  }
};
disableFieldsets(true);

// set address from main pin
var setAddress = function () {
  var mainPinX = Math.round(mapPinMainRect.x + MAIN_PIN_WIDTH / 2);
  var mainPinY = mapPinMainRect.y + MAIN_PIN_HEIGHT;
  formAddress.value = mainPinX + ', ' + mainPinY;
};

// actions on main pin release
var releaseMainPin = function () {
  // unable map
  mapElement.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  setAddress();
  disableFieldsets(false);

  // push pins
  renderUserPins();
};

// map unabling on mouseup
mapPinMain.addEventListener('mouseup', function () {
  releaseMainPin();
});

// show matching card to every pin
var cardElement;
var showCardPopup = function (pinItem) {
  closePopup();
  // renderUserCards (pinItem);
  cardElement = renderCard(pinItem);
  mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
};

//
var closePopup = function () {
  // if a card already exists - remove it
  if (cardElement) {
    cardElement.remove();
  }
};

// close card by esc press
mapElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
});

//
// Form validation
//
// var adFormTitle = adForm.querySelector('#title');
// var adFormPrice = adForm.querySelector('#price');
// var adFormImages = adForm.querySelector('#images');
// var adFormRoomNumber = adForm.querySelector('#room_number');
// var adFormCapacity = adForm.querySelector('#capacity');
//
// // validity check for the title
// adFormTitle.addEventListener('input', function (evt) {
//   var target = evt.target;
//   if (target.value.length < 10) {
//     target.setCustomValidity('Заголовок должен состоять минимум из 10-ти символов.');
//   } else if (target.value.length > 50) {
//     target.setCustomValidity('Заголовок не должен превышать 50-ти символов.');
//   } else if (!target.value) {
//     target.setCustomValidity('Напишите заголово.');
//   } else {
//     target.setCustomValidity('');
//   }
// });
//
// // validity check for the price
// adFormPrice.addEventListener('input', function (evt) {
//   var target = evt.target;
//   if (target.value < 1000) {
//     target.setCustomValidity('Цена не может быть меньше 0.');
//   } else if (target.value > 100000) {
//     target.setCustomValidity('Цена не может быть выше 100000.');
//   } else if (!target.value) {
//     target.setCustomValidity('Укажите цену.');
//   } else {
//     target.setCustomValidity('');
//   }
// });
//
// // validity check for the accomodation images
// adFormImages.addEventListener('input', function (evt) {
//   var target = evt.target;
//   if (!target.value) {
//     target.setCustomValidity('Загрузие фотографии жилья.');
//   } else {
//     target.setCustomValidity('');
//   }
// });
//
// // validity check for the room number to capacity match
// adFormRoomNumber.addEventListener('input', function (evt) {
//   var target = evt.target;
//   if (target.value = 1) {
//
//   }
// });
