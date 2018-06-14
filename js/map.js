'use strict';

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var pinsContainerElement = mapElement.querySelector('.map__pins');

var pinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

var similarCardTemplate = document.querySelector('template')
  .content
  .querySelector('.map__card');


var renderPin = function (accomodation) {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = accomodation.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = accomodation.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = accomodation.author.avatar;
  pinElement.querySelector('img').alt = accomodation.offer.title;

  return pinElement;

};

function renderPhotos(containerElement, photos) {

  console.log(containerElement);

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
  // 1. find the feature container
  console.log(containerElement);
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

var fragment = document.createDocumentFragment();

// for every item in array render pin
window.appartments.forEach(function (appartment) {
  fragment.appendChild(renderPin(appartment));
});

var cardElement = renderCard(window.appartments[0]);

pinsContainerElement.appendChild(fragment);
mapElement.appendChild(cardElement);
