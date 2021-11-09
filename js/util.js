// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const ALERT_SHOW_TIME = 5000;

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

const adjustNounsToNumber = (numberForNoun, textFormsToNumber) => {
  numberForNoun = Math.abs(numberForNoun) % 100;
  const numberMod = numberForNoun % 10;
  if (numberForNoun > 10 && numberForNoun < 20) { return textFormsToNumber[2]; }
  if (numberMod > 1 && numberMod < 5) { return textFormsToNumber[1]; }
  if (numberMod === 1) { return textFormsToNumber[0]; }
  return textFormsToNumber[2];
};

export {adjustNounsToNumber};

const doFormInactive = (form, disableClass) => {
  const elementsOfForm = form.children;
  form.classList.add(disableClass);
  for (let i = 0; i < elementsOfForm.length; i++) {
    elementsOfForm[i].disabled = true;
  }
};

export {doFormInactive};

const doFormActive = (form, disableClass) => {
  const elementsOfForm = form.children;
  form.classList.remove(disableClass);
  for (let i = 0; i < elementsOfForm.length; i++) {
    elementsOfForm[i].disabled = false;
  }
};

export {doFormActive};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'sticky';
  alertContainer.style.left = 0;
  alertContainer.style.bottom = '50%';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {debounce};
