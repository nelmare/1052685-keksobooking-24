// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntInclusive = (min, max)  => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0 || min >= max) {
    return false;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

export {getRandomIntInclusive};

const getRandomIntInclusiveFloat = (min, max, floatCommaNumber) => {
  if(min < 0 || min >= max) {
    return false;
  }
  return Number((Math.random() * (max - min) + min).toFixed(floatCommaNumber));
};

export {getRandomIntInclusiveFloat};

const declOfNum = (n, textForms) => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) { return textForms[2]; }
  if (n1 > 1 && n1 < 5) { return textForms[1]; }
  if (n1 === 1) { return textForms[0]; }
  return textForms[2];
};

export {declOfNum};
