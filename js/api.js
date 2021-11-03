import {showAlert} from './util.js';
import {showErrorMessage, showSuccessMessage} from './ad-form.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Не удалось получить данные. Попробуйте перезагрузить страницу');
      }
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch((err) => {
      showAlert(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    ' https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessMessage();
        onSuccess();
      } else {
        showErrorMessage();
        onFail();
      }
    })
    .catch(() => {
      showErrorMessage();
      onFail();
    });
};

export {getData, sendData};
