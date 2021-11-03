import './data.js';
import './form.js';
import './ad-form.js';
import './map.js';
import './setup.js';
import './display-ads.js';
import './popup.js';
import './api.js';
import {onSubmitClearData, setUserFormSubmit} from './ad-form.js';
import {getData} from './api.js';
import {makeAds} from './map.js';

getData((ads) => {
  makeAds(ads);
});

setUserFormSubmit(onSubmitClearData);
