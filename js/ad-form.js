import {MainMarkerLocation, returnMainPinLocation} from './map.js';
import {sendData} from './api.js';
import {isEscapeKey} from './util.js';
import {closePopup} from './display-ads.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;

const Capacity = {
  NULL: 3,
  ONE: 2,
  TWO: 1,
  THREE: 0,
};

const roomsCapacity = {
  1: {
    allowed: [Capacity.ONE],
    default: 1,
  },
  2: {
    allowed: [Capacity.ONE, Capacity.TWO],
    default: 2,
  },
  3: {
    allowed: [Capacity.ONE, Capacity.TWO, Capacity.THREE],
    default: 3,
  },
  100: {
    allowed: [Capacity.NULL],
    default: 0,
  },
};

const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const adAddressInput = adForm.querySelector('#address');
const adHouseType = adForm.querySelector('#type');
const adPriceInput = adForm.querySelector('#price');
const adRoomNumberSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
const adTimeIn = adForm.querySelector('#timein');
const adTimeOut = adForm.querySelector('#timeout');
const adFeatures = adForm.querySelectorAll('.features__checkbox');
const adDescription = adForm.querySelector('#description');
const adFormPhoto = adForm.querySelector('.ad-form__photo');
const adPhotos = adFormPhoto.querySelectorAll('#images');
const adAvatar = adForm.querySelector('#avatar');
const resetButton = adForm.querySelector('.ad-form__reset');

const onTitleInputFill = () => {
  const valueLengthTitle = adTitleInput.value.length;

  if (valueLengthTitle < MIN_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLengthTitle} симв.`);
  } else if (valueLengthTitle > MAX_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Удалите лишние ${valueLengthTitle - MAX_TITLE_LENGTH} симв.`);
  } else {
    adTitleInput.setCustomValidity('');
  }
  adTitleInput.reportValidity();
};

adTitleInput.addEventListener('input', onTitleInputFill);

const onPriceInputFill = () => {
  const valueLengthPrice = adPriceInput.value.length;

  if (valueLengthPrice > MAX_PRICE_LENGTH) {
    adPriceInput.setCustomValidity(`Цена за ночь не должна превышать ${MAX_PRICE_LENGTH}`);
  } else {
    adPriceInput.setCustomValidity('');
  }
  adPriceInput.reportValidity();
};

adPriceInput.addEventListener('input', onPriceInputFill);

const disableOption = (option) => {
  option.disabled = true;
};

const enableOption = (select, option) =>  {
  select[option].disabled = false;
};

const setRoomNumberDefaultGuests = () => {
  if (adRoomNumberSelect[0]) {
    adCapacitySelect.value = 1;
  }
};

setRoomNumberDefaultGuests();

const onRoomNumberSelectChange = (evt) => {
  const room = evt.target.value;
  const allowedGuests = roomsCapacity[room].allowed;
  const enabledGuests = adCapacitySelect.querySelectorAll('option:not([disabled])');
  enabledGuests.forEach((option) => disableOption(option));
  allowedGuests.forEach((option) => enableOption(adCapacitySelect, option));
  adCapacitySelect.value = roomsCapacity[room].default;
};

adRoomNumberSelect.addEventListener('change', onRoomNumberSelectChange);

const updateAddressInputByPin = (adPinLocationAfterMoving) => {
  adAddressInput.value = `${adPinLocationAfterMoving.lat.toFixed(5)}, ${adPinLocationAfterMoving.lng.toFixed(5)}`;
};

updateAddressInputByPin(MainMarkerLocation);

export {updateAddressInputByPin};

const onSubmitClearData = () => {
  adAvatar.value = '';
  adTitleInput.value = '';
  adAddressInput.value = `${MainMarkerLocation.lat.toFixed(5)}, ${MainMarkerLocation.lng.toFixed(5)}`;
  adHouseType.value = 'flat';
  adPriceInput.value = '';
  adTimeIn.value = '12:00';
  adTimeOut.value = '12:00';
  adCapacitySelect.value = '1';
  adRoomNumberSelect.value = '1';
  adFeatures.forEach((adFeature) => {
    adFeature.checked = false;
  });
  adDescription.value = '';
  adPhotos.forEach((adPhoto) => {
    adPhoto.remove();
  });
  returnMainPinLocation();
  closePopup();
};

const onResetButtonClearData = (evt) => {
  evt.preventDefault();
  onSubmitClearData();
  setRoomNumberDefaultGuests();
};

resetButton.addEventListener('click', onResetButtonClearData);

export {adForm, onSubmitClearData};

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successMessageContainer = successMessageTemplate.cloneNode(true);

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorMessageContainer = errorMessageTemplate.cloneNode(true);

const newTryButton = errorMessageContainer.querySelector('.error__button');

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && document.contains(successMessageContainer)) {
    evt.preventDefault();
    onSuccessMessageClose();
  }
  if (isEscapeKey(evt) && document.contains(errorMessageContainer)) {
    evt.preventDefault();
    onSuccessMessageClose();
  }
};

const onSuccessMessageClose = () => {
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

const onErrorMessageClose = () => {
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
