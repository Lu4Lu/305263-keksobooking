'use strict';
(function () {
  var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');

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
    cardElement.querySelector('.popup__close').addEventListener('click', window.closePopup);

    return cardElement;
  }

  // show matching card to every pin
  var cardElement;
  function showCardPopup(pinItem) {
    closePopup();
    cardElement = window.renderCard(pinItem);
    window.mapElement.insertBefore(cardElement, window.mapElement.querySelector('.map__filters-container'));
  }

  function closePopup() {
    // if a card already exists - remove it
    if (cardElement) {
      cardElement.remove();
    }
  }

  window.showCardPopup = showCardPopup;
  window.closePopup = closePopup;
  window.renderCard = renderCard;
})();

