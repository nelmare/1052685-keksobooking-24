import {adPinMarkerLocation} from './map.js';

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
const adTitleInput = document.querySelector('#title');
const adPriceInput = document.querySelector('#price');
const adRoomNumberSelect = document.querySelector('#room_number');
const adCapacitySelect = document.querySelector('#capacity');
const adAddressInput = document.querySelector('#address');

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

const onRoomNumberSelectChange = (evt) => {
  const room = evt.target.value;
  const allowedGuests = roomsCapacity[room].allowed;
  const enabledGuests = adCapacitySelect.querySelectorAll('option:not([disabled])');
  enabledGuests.forEach((option) => disableOption(option));
  allowedGuests.forEach((option) => enableOption(adCapacitySelect, option));
  adCapacitySelect.value = roomsCapacity[room].default;
};

adRoomNumberSelect.addEventListener('change', onRoomNumberSelectChange);

adAddressInput.value = `${adPinMarkerLocation.lat.toFixed(5)}, ${adPinMarkerLocation.lng.toFixed(5)}`;

const updateAddressInputByPin = (adPinLocationAfterMoving) => {
  adAddressInput.value = `${adPinLocationAfterMoving.lat.toFixed(5)}, ${adPinLocationAfterMoving.lng.toFixed(5)}`;
};

export {updateAddressInputByPin};
