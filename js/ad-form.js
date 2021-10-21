const adTitleInput = document.querySelector('#title');
const adPriceInput = document.querySelector('#price');

// adTitleInput.addEventListener('invalid', () => {
//   if (adTitleInput.validity.tooShort) {
//     adTitleInput.setCustomValidity('Имя должно состоять минимум из 30 символов');
//   } else if (adTitleInput.validity.tooLong) {
//     adTitleInput.setCustomValidity('Имя не должно превышать 100 символов');
//   } else if (adTitleInput.validity.valueMissing) {
//     adTitleInput.setCustomValidity('Обязательное поле');
//   } else {
//     adTitleInput.setCustomValidity('');
//   }
// });

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;

adTitleInput.addEventListener('input', () => {
  const valueLengthTitle = adTitleInput.value.length;

  if (valueLengthTitle < MIN_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLengthTitle} симв.`);
  } else if (valueLengthTitle > MAX_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Удалите лишние ${valueLengthTitle - MAX_TITLE_LENGTH} симв.`);
  } else {
    adTitleInput.setCustomValidity('');
  }
  adTitleInput.reportValidity();
});

adPriceInput.addEventListener('input', () => {
  const valueLengthPrice = adPriceInput.value.length;

  if (valueLengthPrice < MAX_PRICE_LENGTH || valueLengthPrice > MAX_PRICE_LENGTH) {
    adPriceInput.setCustomValidity(`Цена за ночь не должна превышать ${MAX_PRICE_LENGTH}`);
  } else {
    adPriceInput.setCustomValidity('');
  }
  adPriceInput.reportValidity();
});

const adRoomNumberSelect = document.querySelector('#room_number');
const adCapacitySelect = document.querySelector('#capacity');
const adCapacityObject = {
  ONE: ['1'],
  TWO: ['1','2'],
  THREE: ['1','2', '3'],
  NULL: ['0'],
};

if (adRoomNumberSelect.options[0]) {
  adCapacitySelect.value = '1';
}

// adRoomNumberSelect.addEventListener('input', () => {
//   if (adRoomNumberSelect.value === '1') {
//     adCapacitySelect.value = adCapacityObject.ONE;
//     adCapacitySelect.options.disabled = true;
//     adCapacitySelect.options[adCapacitySelect.value].enabled = true;
//   } else if (adRoomNumberSelect.value === '2') {
//     adCapacitySelect.value = adCapacityObject.TWO;
//     adCapacitySelect.options.disabled = true;
//     adCapacitySelect.options[adCapacitySelect.value].enabled = true;
//   } else if (adRoomNumberSelect.value === '3') {
//     adCapacitySelect.value = '3';
//     adCapacitySelect.options[3].disabled = true;
//   } else {
//     adCapacitySelect.value = '0';
//     adCapacitySelect.options[0].disabled = true;
//     adCapacitySelect.options[1].disabled = true;
//     adCapacitySelect.options[2].disabled = true;
//   }
//   adRoomNumberSelect.reportValidity();
// });

  // adRoomNumberSelect.addEventListener('input', () => {
  //   if (adRoomNumberSelect.value === '1') {
  //     adCapacitySelect.value = '1';
  //     adCapacitySelect.options[0].disabled = true;
  //     adCapacitySelect.options[1].disabled = true;
  //     adCapacitySelect.options[3].disabled = true;
  //   } else if (adRoomNumberSelect.value === '2') {
  //     adCapacitySelect.value = '2';
  //     adCapacitySelect.options[0].disabled = true;
  //     adCapacitySelect.options[3].disabled = true;
  //   } else if (adRoomNumberSelect.value === '3') {
  //     adCapacitySelect.value = '3';
  //     adCapacitySelect.options[3].disabled = true;
  //   } else {
  //     adCapacitySelect.value = '0';
  //     adCapacitySelect.options[0].disabled = true;
  //     adCapacitySelect.options[1].disabled = true;
  //     adCapacitySelect.options[2].disabled = true;
  //   }
  //   adRoomNumberSelect.reportValidity();
  // });

