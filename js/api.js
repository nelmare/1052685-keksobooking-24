// import {showAlert} from './util.js';
import {showAlert, showSuccessMessage} from './util.js';
import {showErrorMessage} from './util.js';
// import {adForm} from './ad-form.js';
import {makeAds} from './map.js';

// const setUserFormSubmit = (onSuccess) => {
//   adForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//
//     const formData = new FormData(evt.target);
//
//     fetch(
//       ' https://24.javascript.pages.academy/keksobooking',
//       {
//         method: 'POST',
//         body: formData,
//       },
//     )
//       .then((response) => {
//         if (response.ok) {
//           showSuccessMessage();
//           onSuccess();
//         } else {
//           showErrorMessage();
//         }
//       })
//       .catch(() => {
//         showErrorMessage();
//       });
//   });
// };

// export {setUserFormSubmit};


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
      makeAds(ads);
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
