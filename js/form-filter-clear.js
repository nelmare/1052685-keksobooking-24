import {
  MainMarkerLocation,
  returnMainPinLocation
} from './map.js';
import {closePopup} from './display-ads.js';
import {adForm, adsFilter} from './form.js';
import {
  adAddressInput,
  adCapacitySelect,
  adPriceInput,
  adRoomNumberSelect,
  setRoomNumberDefaultGuests
} from './ad-form.js';

const adFormPhoto = adForm.querySelector('.ad-form__photo');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview');
export const avatarPreview = avatarPreviewContainer.querySelector('img');
const resetButton = adForm.querySelector('.ad-form__reset');

const clearData = () => {
  adForm.reset();
  avatarPreview.setAttribute('src', 'img/muffin-grey.svg');
  adAddressInput.value = `${MainMarkerLocation.lat.toFixed(5)}, ${MainMarkerLocation.lng.toFixed(5)}`;
  adPriceInput.placeholder = '1000';
  adCapacitySelect.value = '1';
  adRoomNumberSelect.value = '1';
  adFormPhoto.innerHTML = '';
  returnMainPinLocation();
  closePopup();
  adsFilter.reset();
};

export {clearData};

const onResetButtonClearData = (evt) => {
  evt.preventDefault();
  clearData();
  setRoomNumberDefaultGuests();
};

resetButton.addEventListener('click', onResetButtonClearData);
