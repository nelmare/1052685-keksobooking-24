// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntInclusive = (min, max)  => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0 || min >= max) {
    return false;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

getRandomIntInclusive(2, 25);

const getRandomIntInclusiveFloat = (min, max, floatCommaNumber) => {
  if(min < 0 || min >= max) {
    return false;
  }
  return Number((Math.random() * (max - min) + min).toFixed(floatCommaNumber));
};

getRandomIntInclusiveFloat(2, 25, 7);

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS =  [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomElementIndex = (elements) => getRandomIntInclusive(0,elements.length-1);

const getRandomElement = (elements) => {
  const randomElementIndex = getRandomElementIndex(elements);
  return elements[randomElementIndex];
};

const getRandomElementsSlice = (elements) => {
  const randomElementIndex = getRandomElementIndex(elements);
  return elements.slice(0,randomElementIndex);
};

const data = [];
// eslint-disable-next-line id-length
for (let i = 0; i <= 9; i++) {
  const location = {
    lat: getRandomIntInclusiveFloat(35.65000, 35.70000, 5),
    lng: getRandomIntInclusiveFloat(139.70000, 139.80000, 5),
  };

  data.push({
    author: {
      avatar: `img/avatars/user${  i < 10 ? '0' : ''   }${i + 1  }.png`,
    },
    offer: {
      title: 'Заголовок предложения',
      address: `${location.lat  }, ${  location.lng}`,
      price: getRandomIntInclusive(1,1000),
      type: getRandomElement(TYPES),
      rooms: getRandomIntInclusive(1,8),
      guests: getRandomIntInclusive(1,15),
      checkin: getRandomElement(CHECKINS),
      checkout: getRandomElement(CHECKOUTS),
      features: getRandomElementsSlice(FEATURES),
      description: 'Комфортабельное жилье для котиков любой масти',
      photos: getRandomElementsSlice(PHOTOS),
    },
    location: location,
  });
}
