import './data.js';
import './form.js';
import './ad-form.js';
import './map.js';
import './setup.js';
import './display-ads.js';
import './popup.js';
import './api.js';
import './filter.js';
import './store.js';

import {onSubmitClearData, setUserFormSubmit} from './ad-form.js';
import {getData} from './api.js';
import {makeAds} from './display-ads.js';

const ADS_COUNT = 10;

getData((ads) => {
  makeAds(ads.slice(0, ADS_COUNT));
});

setUserFormSubmit(onSubmitClearData);
