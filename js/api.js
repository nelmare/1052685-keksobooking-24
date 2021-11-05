import {showAlert} from './util.js';
import {onErrorMessageShow, onSuccessMessageShow} from './ad-form.js';
// import {storeAds} from './store.js';
// import {isHousingFilterOptionSelected} from './filter.js';

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
      // storeAds(ads);
      onSuccess(ads)
    })
      // return ads;
      // console.log(ads);
    .then((data) => {
      const ADS_COUNT = 10;

      const adsFilter = document.querySelector('.map__filters');
      const housingTypeFilter = adsFilter.querySelector('#housing-type');
      const housingTypeFilterOption = housingTypeFilter.querySelector('option');
      // const housingPriceFilter = adsFilter.querySelector('#housing-price');
      // const housingRoomsFilter = adsFilter.querySelector('#housing-rooms');
      // const housingGuestsFilter = adsFilter.querySelector('#housing-guests');
      // const housingFeaturesFilter = adsFilter.querySelector('#housing-features');

      let housingType;
      housingTypeFilter.addEventListener('change', (evt) => {
        housingType = evt.target.value;
        housingTypeFilterOption.value = housingType;
      });

      const isHousingFilterOptionSelected = (ad) => housingType === ad.type;
      const filteredAds = ads.filter(isHousingFilterOptionSelected);
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
        onSuccessMessageShow();
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onErrorMessageShow();
      onFail();
    });
};

export {getData, sendData};

