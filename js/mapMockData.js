'use strict';
(function mockUserData() {

  var MOCK_AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  var MOCK_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var MOCK_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var MOCK_CHECKIN = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var MOCK_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var MOCK_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var MOCK_PHOTOS = [
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

  window.appartments = [];

  for (var i = 0; i < 8; i++) {
    var location = {
      x: getRandomInt(300, 900),
      y: getRandomInt(130, 630)
    };

    // object with all accommodation data
    var accomodation = {
      author: {
        avatar: getRandomItemFromArrayAndRemoveItem(MOCK_AVATARS)
      },

      offer: {
        title: getRandomItemFromArrayAndRemoveItem(MOCK_TITLES),
        address: location.x + ', ' + location.y,
        price: getRandomInt(1000, 1000000),
        type: getRandomItemFromArray(MOCK_TYPES),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 20),
        checkin: getRandomItemFromArray(MOCK_CHECKIN),
        checkout: getRandomItemFromArray(MOCK_CHECKOUT),
        features: getRandomItemsFromArray(MOCK_FEATURES),
        description: ' ',
        photos: getRandomOrderForArray(MOCK_PHOTOS)
      },

      location: location
    };

    window.appartments.push(accomodation);
  }
  // console.log(window.appartments);
})();