import {
  adsFilter,
  ANY_VALUE,
  guestsFilter,
  housingTypeFilter,
  MainMarkerLocation,
  priceFilter,
  returnMainPinLocation,
  roomsFilter
} from './map.js';
import {closePopup} from './display-ads.js';
import {adForm} from './form.js';
import {
  adAddressInput,
  adCapacitySelect,
  adHouseType,
  adPriceInput,
  adRoomNumberSelect,
  adTimeIn,
  adTimeOut,
  adTitleInput,
  setRoomNumberDefaultGuests
} from './ad-form.js';

const adFeatures = adForm.querySelectorAll('.features__checkbox');
const adDescription = adForm.querySelector('#description');
const adFormPhoto = adForm.querySelector('.ad-form__photo');
const adPhotos = adFormPhoto.querySelectorAll('#images');
const adAvatar = adForm.querySelector('#avatar');
const resetButton = adForm.querySelector('.ad-form__reset');
const featuresFilter = adsFilter.querySelector('#housing-features');
const featuresFilterInputs = featuresFilter.querySelectorAll('.map__checkbox');

const onSubmitClearData = () => {
  adAvatar.value = '';
  adTitleInput.value = '';
  adAddressInput.value = `${MainMarkerLocation.lat.toFixed(5)}, ${MainMarkerLocation.lng.toFixed(5)}`;
  adHouseType.value = 'flat';
  adPriceInput.value = '';
  adPriceInput.placeholder = '5000';
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
  housingTypeFilter.value = ANY_VALUE;
  priceFilter.value = ANY_VALUE;
  roomsFilter.value = ANY_VALUE;
  guestsFilter.value = ANY_VALUE;
  for (const featuresFilterInput of featuresFilterInputs) {
    featuresFilterInput.checked = false;
  }
};

const onResetButtonClearData = (evt) => {
  evt.preventDefault();
  onSubmitClearData();
  setRoomNumberDefaultGuests();
};

resetButton.addEventListener('click', onResetButtonClearData);

export {onSubmitClearData};
