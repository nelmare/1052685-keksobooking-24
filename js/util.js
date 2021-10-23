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

const adjustNounsToNumber = (numberForNoun, textFormsToNumber) => {
  numberForNoun = Math.abs(numberForNoun) % 100;
  const numberMod = numberForNoun % 10;
  if (numberForNoun > 10 && numberForNoun < 20) { return textFormsToNumber[2]; }
  if (numberMod > 1 && numberMod < 5) { return textFormsToNumber[1]; }
  if (numberMod === 1) { return textFormsToNumber[0]; }
  return textFormsToNumber[2];
};

export {adjustNounsToNumber};

const elementsOfForm = form.children;

const doFormInactive = (form, disableClass) => {
  form.classList.add(disableClass);
  for (let i = 0; i < elementsOfForm.length; i++) {
    elementsOfForm[i].disabled = true;
  }
};

export {doFormInactive};

const doFormActive = (form, disableClass) => {
  form.classList.remove(disableClass);
  for (let i = 0; i < elementsOfForm.length; i++) {
    elementsOfForm[i].disabled = false;
  }
};

export {doFormActive};
