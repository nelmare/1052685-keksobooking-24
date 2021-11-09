import {doFormInactive} from './util.js';

export const adForm = document.querySelector('.ad-form');
export const adsFilter = document.querySelector('.map__filters');

doFormInactive(adForm, 'ad-form--disabled');
doFormInactive(adsFilter, 'map__filters--disabled');

