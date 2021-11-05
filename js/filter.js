// import {makeAds} from './api.js';
import {type} from './data.js';
// import {map, adItem} from "./map";
import {makeAds} from './display-ads.js';
// import {getAds} from './store.js';

// const ADS_COUNT = 10;
//
// const adsFilter = document.querySelector('.map__filters');
// const housingTypeFilter = adsFilter.querySelector('#housing-type');
// const housingTypeFilterOption = housingTypeFilter.querySelector('option');
// const housingPriceFilter = adsFilter.querySelector('#housing-price');
// const housingRoomsFilter = adsFilter.querySelector('#housing-rooms');
// const housingGuestsFilter = adsFilter.querySelector('#housing-guests');
// const housingFeaturesFilter = adsFilter.querySelector('#housing-features');

// const isFilterOptionSelected = (housingTypeFilter.options, housingPriceFilter.options, housingRoomsFilter.options, housingGuestsFilter.options) => {
//   if (housingTypeFilter.value && housingPriceFilter.value && housingRoomsFilter.value && housingGuestsFilter.value) {
//     return selectedFilterOptions;
//   }
// }

// let adItems;
// adItems = makeAds(ads);

// один из вариантов
// let housingType;
//
// housingTypeFilter.addEventListener('change', (evt) => {
//   housingType = evt.target.value;
//   housingTypeFilterOption.value = housingType;
// });
//
// ads.forEach(({location: {lat, lng}, offer, author}) => {
//   const isFilterOptionSelected = (ads) => {
//     if (housingType === type[offer.type]) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//
//   ads.filter(isFilterOptionSelected);
//   makeAds(ads.slice(0, ADS_COUNT));
// });




// const filteredAds = ads.filter(isHousingFilterOptionSelected);

// clearAds();
// makeAds(filteredAds.slice(0, ADS_COUNT));

// export {isHousingFilterOptionSelected};
