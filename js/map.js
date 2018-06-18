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
    setCard(accomodation);
  });

  return pinElement;

};

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
    // console.log(photoElement);

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

  return cardElement;
};

var pushPins = function () {
  var fragment = document.createDocumentFragment();
  // for every item in array render pin
  window.appartments.forEach(function (appartment) {
    fragment.appendChild(renderPin(appartment));
  });
  pinsContainerElement.appendChild(fragment);
};

var pushCard = function (pinItem) {
  var cardElement = renderCard(pinItem);
  mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
};

//
// Pin interaction with web site
//
//
// var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;

var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;

var mapPinMain = mapElement.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var formAddress = adForm.querySelector('#address');
var mapPinMainRect = mapPinMain.getBoundingClientRect();

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

// functions start on main pin release
var releaseMainPin = function () {
  // unable map
  mapElement.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  setAddress();
  disableFieldsets(false);

  // push pins
  pushPins();
  mapPinMain.removeEventListener('mouseup', onMapPinMainMouseup);
};

// map unabling on mouseup
var onMapPinMainMouseup = function () {
  releaseMainPin();
};
mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);

var setCard = function (accomodation) {

  pushCard(accomodation);
  // cardElement = renderCard(accomodation);
  // mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
};

// 1. find all the pins
// 2. check the click
// 3. find the index of pin (index of pin = index of card, cause the use the same appartments[i]
// 4. set the index to renderCard
// 5. add close
// var onUserPinClick = function () {
//   // choose all pins except main
//   var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
//   // open card
//   var openCard = function () {
//
//     // // var index = ???
//     // var cardElement = renderCard(index);
//     // mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
//   };
//   //
//   // var closeElement = document.querySelector('.popup__close');
//   // closeElement.addEventListener('click', function () {
//   //   cardElement.remove();
//   // });
// };
