import './data.js';
import './form.js';
import './ad-form.js';
import './map.js';
import './setup.js';
import './display-ads.js';
import './popup.js';
import './api.js';
import {onSubmitClearData} from './ad-form.js';
import {setUserFormSubmit} from './api.js';
import {makeAds} from './map.js';
import {showAlert} from './util.js';

const ADS_MAP_COUNT = 6;
fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Не удалось получить данные. Попробуйте перезагрузить страницу');
    }
  })
  .then((ads) => {
    makeAds(ads.slice(0, ADS_MAP_COUNT));
  })
  .catch((err) => {
    showAlert(err);
  });

setUserFormSubmit(onSubmitClearData);
