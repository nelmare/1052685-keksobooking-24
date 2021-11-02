// import {showAlert} from './util.js';
import {showSuccessMessage} from './util.js';
import {showErrorMessage} from './util.js';
import {adForm} from './ad-form.js';

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      ' https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          showSuccessMessage();
          onSuccess();
        } else {
          showErrorMessage();
        }
      })
      .catch(() => {
        showErrorMessage();
      });
  });
};

export {setUserFormSubmit};
