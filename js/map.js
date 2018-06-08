/* eslint-disable */

var avatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkInTimes = [
  '12:00',
  '14:00',
  '13:00'
];

var checkOutTimes = [
  '12:00',
  '14:00',
  '13:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

//random from range
var min;
var max;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//get random array index
var anyArray = [];
function getRandomIndex(anyArray) {
  return Math.floor(Math.random() * anyArray.length)
}

//location
var locationX = [];
var locationY = [];

for (var i = 0; i < 8; i++) {
  locationX[i] = getRandomInt(300, 900);
  locationY[i] = getRandomInt(130, 630);
}

var accomodation = {};

var offers = [];

var homeAuthors = [];
var homeTitles = [];
var homePrices = [];
var homeAddresses = [];
var homeTypes = [];
var homeRooms = [];
var homeGuests = [];
var homeCheckInTimes = [];
var homeCheckOutTimes = [];
var homeFeatures = [];
var homeDescriptions = [];
var homePhotos = [];

for (var i = 0; i < 8; i++) {

  // author
  var randomAuthorIndex = getRandomIndex(avatars);
  homeAuthors[i] = avatars[randomAuthorIndex];
  accomodation.author = homeAuthors[i];
  avatars.splice(randomAuthorIndex, 1);

  //title
  var randomTitleIndex = getRandomIndex(titles);
  homeTitles[i] = titles[randomTitleIndex];
  titles.splice(randomTitleIndex, 1);
  // offers.push(homeTitles[i]);

  //price
  homePrices[i] = getRandomInt(1000, 1000000);
  // offers.push(homePrices[i]);

  //address
  homeAddresses[i] = locationX[i] + ', ' + locationY[i];
  // offers.push(homeAddresses[i]);

  //type
  var randomTypeIndex = getRandomIndex(types);
  homeTypes[i] = types[randomTypeIndex];
  // offers.push(homeTypes[i]);

  //rooms amount
  homeRooms[i] = getRandomInt(1, 5);
  // offers.push(homeRooms[i]);

  //guest amount
  homeGuests[i] = getRandomInt(1, 100);
  // offers.push(homeGuests[i]);

  //check-in time
  var randomCheckInIndex = getRandomIndex(checkInTimes);
  homeCheckInTimes[i] = checkInTimes[randomCheckInIndex];
  // offers.push(homeCheckInTimes[i]);

  //check-out time
  var randomCheckOutIndex = getRandomIndex(checkOutTimes);
  homeCheckOutTimes[i] = checkOutTimes[randomCheckOutIndex];
  // offers.push(homeCheckOutTimes[i]);

  //features array
  var tempFeatures = features.slice();
  //random amount of feature
  var featureAmount = getRandomInt(1, 6);
  for (var j = 0; j <= featureAmount - 1; j++) {
    //random for the exact feature
    var randomFeatureIndex = getRandomIndex(tempFeatures);
    homeFeatures[j] = tempFeatures[randomFeatureIndex];
    tempFeatures.splice(randomFeatureIndex, 1);
  }

  //photo links
  var tempPhotos = photos.slice();
  // console.log(tempPhotos);
  for (var j = 0; j < photos.lenght; j++) {
    var randomPhotoIndex = getRandomIndex(tempPhotos);
    console.log(randomPhotoIndex);
    homePhotos[j] = tempPhotos[randomPhotoIndex];
    console.log(homePhotos[j]);
    tempPhotos.splice(randomPhotoIndex, 1);
  }

  //description
  homeDescriptions[i] = '___________';
  // offers.push(homeDescriptions[i]);

  //all info in offer
  offers[i] = [homeTitles[i],
    homePrices[i],
    homeAddresses[i],
    homePrices[i],
    homeTypes[i],
    homeRooms[i],
    homeFeatures,
    homeDescriptions[i],
    homePhotos
  ];

  accomodation.offer = offers[i];

  accomodation.location = homeAddresses[i];

  console.log(i);
  console.log(accomodation);
}

/* eslint-enable */
