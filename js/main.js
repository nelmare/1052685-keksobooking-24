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
