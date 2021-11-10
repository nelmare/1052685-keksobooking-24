import {MainMarkerLocation} from './map.js';
import {adForm} from './form.js';

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

const MinPrice = {
  'bungalow': 0,
  'hotel': 3000,
  'flat': 5000,
  'house': 5000,
  'palace': 10000,
};

export const adTitleInput = adForm.querySelector('#title');
export const adAddressInput = adForm.querySelector('#address');
export const adHouseType = adForm.querySelector('#type');
export const adPriceInput = adForm.querySelector('#price');
export const adRoomNumberSelect = adForm.querySelector('#room_number');
export const adCapacitySelect = adForm.querySelector('#capacity');
export const adTimeIn = adForm.querySelector('#timein');
export const adTimeOut = adForm.querySelector('#timeout');

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

  valueLengthPrice > MAX_PRICE_LENGTH ?
    adPriceInput.setCustomValidity(`Цена за ночь не должна превышать ${MAX_PRICE_LENGTH}`) :
    adPriceInput.setCustomValidity('');
  adPriceInput.reportValidity();
};

adPriceInput.addEventListener('input', onPriceInputFill);

const onHousingTypeInputMinPrice = (evt) => {
  const houseType = evt.target.value;
  adPriceInput.setAttribute('min', MinPrice[houseType]);
  adPriceInput.setAttribute('placeholder', MinPrice[houseType]);
};

adHouseType.addEventListener('input', onHousingTypeInputMinPrice);

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

export {setRoomNumberDefaultGuests};

const onRoomNumberSelectChange = (evt) => {
  const room = evt.target.value;
  const allowedGuests = roomsCapacity[room].allowed;
  const enabledGuests = adCapacitySelect.querySelectorAll('option:not([disabled])');
  enabledGuests.forEach((option) => disableOption(option));
  allowedGuests.forEach((option) => enableOption(adCapacitySelect, option));
  adCapacitySelect.value = roomsCapacity[room].default;
};

adRoomNumberSelect.addEventListener('change', onRoomNumberSelectChange);

const onTimeInTimeOutSelectChange = (evt) => {
  adTimeIn.value = evt.target.value;
  adTimeOut.value = evt.target.value;
};

adTimeIn.addEventListener('change', onTimeInTimeOutSelectChange);
adTimeOut.addEventListener('change', onTimeInTimeOutSelectChange);

const updateAddressInputByPin = (adPinLocationAfterMoving) => {
  adAddressInput.value = `${adPinLocationAfterMoving.lat.toFixed(5)}, ${adPinLocationAfterMoving.lng.toFixed(5)}`;
};

updateAddressInputByPin(MainMarkerLocation);

export {updateAddressInputByPin};
