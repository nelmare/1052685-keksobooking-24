import {doFormInactive} from './util.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

doFormInactive(adForm, 'ad-form--disabled');
doFormInactive(mapFilters, 'map__filters--disabled');

export {adForm};
export {mapFilters};
