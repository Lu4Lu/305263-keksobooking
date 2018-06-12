'use strict';

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var pinListElement = userDialog.querySelector('.map__pins');

var similarPinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

var cardListElement = userDialog;
var cardListElement = userDialog.querySelector('.map');

var similarCardTemplate = document.querySelector('template')
  .content
  .querySelector('.map__card');


var mockAvatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var mockTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var mockTypes = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var mockCheckIn = [
  '12:00',
  '13:00',
  '14:00'
];

var mockCheckOut = [
  '12:00',
  '13:00',
  '14:00'
];

var mockFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var mockPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// random from range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// random array index
function getRandomIndex(arr) {
  return getRandomInt(0, arr.length - 1);
}

// random array item
function getRandomItemFromArray(arr) {
  // get an array element with the random index
  return arr[getRandomIndex(arr)];
}

// remove randomly an array element
function getRandomItemFromArrayAndRemoveItem(arr) {
  // search for the index
  var index = getRandomIndex(arr);
  var item = arr[index];
  // remove this item from array
  arr.splice(index, 1);
  // remove the item from array (foreeeeeveeer!)
  return item;
}

// get random set of items
function getRandomOrderForArray(arr) {
  var orderArr = [];
  var copyArr = arr.slice();
  // make the cycle for random amount of items
  for (var i = 0; i < arr.length; i++) {
    // add sequentially the items initial array to the new one
    orderArr.push(getRandomItemFromArrayAndRemoveItem(copyArr));
    // search for the index
  }
  return orderArr;
}

function getRandomItemsFromArray(arr) {
  // amount of items
  var items = getRandomInt(1, arr.length);
  // create a new array with this items
  return getRandomOrderForArray(arr).slice(0, items);
}

(function mockUserData() {

  window.appartments = [];

  for (var i = 0; i < 8; i++) {
    var location = {
      x: getRandomInt(300, 900),
      y: getRandomInt(130, 630)
    };

    // object with all accommodation data
    var accomodation = {
      author: {
        avatar: getRandomItemFromArrayAndRemoveItem(mockAvatars)
      },

      offer: {
        title: getRandomItemFromArrayAndRemoveItem(mockTitles),
        address: location.x + ', ' + location.y,
        price: getRandomInt(1000, 1000000),
        type: getRandomItemFromArray(mockTypes),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 20),
        checkin: getRandomItemFromArray(mockCheckIn),
        checkout: getRandomItemFromArray(mockCheckOut),
        features: getRandomItemsFromArray(mockFeatures),
        description: ' ',
        photos: getRandomOrderForArray(mockPhotos)
      },

      location: location
    };

    window.appartments.push(accomodation);
  }
})();

// window.accomodations = [
//   {
//     locationX: '100px',
//     locationY: '100px',
//     title: 'flksajflks',
//     author: 'lkjlksdjflksjf'
//   },
//   {
//     locationX: 200,
//     locationY: 200,
//     title: 'flksajflks',
//     author: 'lkjlksdjflksjf'
//   },
//   {
//     locationX: 300,
//     locationY: 400,
//     title: 'flksajflks',
//     author: 'lkjlksdjflksjf'
//   },
//   {
//     locationX: 500,
//     locationY: 600,
//     title: 'flksajflks',
//     author: 'lkjlksdjflksjf'
//   }
// ];


var renderPin = function (accomodation) {

  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = accomodation.location.x + 'px';
  pinElement.style.top = accomodation.location.y + 'px';
  pinElement.querySelector('img').src = accomodation.author.avatar;
  pinElement.querySelector('img').alt = accomodation.offer.title;

  return pinElement;

};

var renderCard = function (accomodation) {

  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = accomodation.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = accomodation.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = accomodation.offer.price + 'Р/ночь';
  cardElement.querySelector('.popup__type').textContent = accomodation.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = accomodation.offer.rooms + 'для ' + accomodation.offer.guests + 'гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + accomodation.offer.checkin  + ', выезд до ' + accomodation.offer.checkin + '.';
  // cardElement.querySelector('.popup__features').textContent = accomodation.offer.features';
  cardElement.querySelector('.popup__description').textContent = accomodation.offer.description;
  // cardElement.querySelector('.popup__photos').textContent = 'offer.photos';
  cardElement.querySelector('.popup__avatar').src = accomodation.author.avatar;

  return cardElement;

};

var fragment = document.createDocumentFragment();

window.appartments.forEach(function(appartment) {
  fragment.appendChild(renderPin(appartment));
  fragment.appendChild(renderCard(appartment));
})


for (var i = 0; i < window.appartments.length; i++) {

  // console.log(window.appartments[i]);


}
pinListElement.appendChild(fragment);
cardListElement.appendChild(fragment);
