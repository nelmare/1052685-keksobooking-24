import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {adForm} from './form.js';

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successMessageContainer = successMessageTemplate.cloneNode(true);

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorMessageContainer = errorMessageTemplate.cloneNode(true);

const newTryButton = errorMessageContainer.querySelector('.error__button');

let successMessageClose = null;
let errorMessageClose = null;

const onMessageEscKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  if (document.contains(successMessageContainer)) {
    successMessageClose();
  }
  if (document.contains(errorMessageContainer)) {
    errorMessageClose();
  }
};

successMessageClose = () => {
  successMessageContainer.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', successMessageClose);
};

const showSuccessMessage = () => {
  document.body.appendChild(successMessageContainer);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', successMessageClose);
};

export {showSuccessMessage};

errorMessageClose = () => {
  errorMessageContainer.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', errorMessageClose);
  newTryButton.removeEventListener('click', errorMessageClose);
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessageContainer);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', errorMessageClose);
  newTryButton.addEventListener('click', errorMessageClose);
};

export {showErrorMessage};

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit};
