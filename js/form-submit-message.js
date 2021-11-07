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

let onSuccessMessageClose = null;
let onErrorMessageClose = null;

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && document.contains(successMessageContainer)) {
    evt.preventDefault();
    onSuccessMessageClose();
  }
  if (isEscapeKey(evt) && document.contains(errorMessageContainer)) {
    evt.preventDefault();
    onErrorMessageClose();
  }
};

onSuccessMessageClose = () => {
  successMessageContainer.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onSuccessMessageClose);
};

const onSuccessMessageShow = () => {
  document.body.appendChild(successMessageContainer);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onSuccessMessageClose);
};

export {onSuccessMessageShow};

onErrorMessageClose = () => {
  errorMessageContainer.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onErrorMessageClose);
  newTryButton.removeEventListener('click', onErrorMessageClose);
};

const onErrorMessageShow = () => {
  document.body.appendChild(errorMessageContainer);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClose);
  newTryButton.addEventListener('click', onErrorMessageClose);
};

export {onErrorMessageShow};

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onErrorMessageShow(),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit};
