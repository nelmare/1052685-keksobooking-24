import {makeDebounce, doFormActive} from './util.js';
import {adForm, adsFilter} from './form.js';
import {updateAddressInputByPin} from './ad-form.js';
import {getData} from './api.js';
import {makeAds, cleanMarkers} from './display-ads.js';

const FIRST_LIMIT_PRICE = 10000;
const SECOND_LIMIT_PRICE = 50000;
const LOW_VALUE = 'middle';
const HIGH_VALUE = 'high';
const MIDDLE_VALUE = 'middle';
export const ANY_VALUE = 'any';

const MainMarkerLocation = {
  lat: 35.68950,
  lng: 139.69171,
};

export {MainMarkerLocation};

export const housingTypeFilter = adsFilter.querySelector('#housing-type');
export const priceFilter = adsFilter.querySelector('#housing-price');
export const roomsFilter = adsFilter.querySelector('#housing-rooms');
export const guestsFilter = adsFilter.querySelector('#housing-guests');

const isHousingTypeOptionSelected = (ad) => housingTypeFilter.value === ANY_VALUE || housingTypeFilter.value === ad.offer.type;
const isRoomCountOptionSelected = (ad) => roomsFilter.value === ANY_VALUE || roomsFilter.value === ad.offer.rooms.toString();
const isGuestsOptionSelected = (ad) => guestsFilter.value === ANY_VALUE || guestsFilter.value === ad.offer.guests.toString();
const isPriceOptionSelected = (ad) => {
  switch (priceFilter.value) {
    case MIDDLE_VALUE:
      return ad.offer.price >= FIRST_LIMIT_PRICE && ad.offer.price <= SECOND_LIMIT_PRICE;
    case LOW_VALUE:
      return ad.offer.price < FIRST_LIMIT_PRICE;
    case HIGH_VALUE:
      return ad.offer.price > SECOND_LIMIT_PRICE;
    default:
      return priceFilter.value === ANY_VALUE;
  }
};

const isFeatureFilterSelected = (ad) => {
  const featuresSelected = adsFilter.querySelectorAll('input:checked');
  const selectedValues = Array.from(featuresSelected).map((input) => input.value);
  return selectedValues.every((value) => ad.offer.features && ad.offer.features.includes(value));
};

const checkFilters = (ad) => isHousingTypeOptionSelected(ad)
  && isRoomCountOptionSelected(ad)
  && isGuestsOptionSelected(ad)
  && isPriceOptionSelected(ad)
  && isFeatureFilterSelected(ad);

const onGetDataSuccess = (ads) => {
  doFormActive(adsFilter, 'map__filters--disabled');
  makeAds(ads);
  const onFilterChangeAds = () => {
    cleanMarkers();
    const filteredAds = ads.filter(checkFilters);
    makeAds(filteredAds);
  };

  adsFilter.addEventListener('change', makeDebounce(onFilterChangeAds, 500));
};

const map = L.map('map-canvas')
  .on('load', () => {
    doFormActive(adForm, 'ad-form--disabled');
    getData(onGetDataSuccess);
  })
  .setView({
    lat: MainMarkerLocation.lat,
    lng: MainMarkerLocation.lng,
  }, 10);

export {map};

export const markerGroup = L.layerGroup().addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/leaflet/images/marker-icon-2x.png',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68951,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  updateAddressInputByPin(evt.target.getLatLng());
});

export {mainPinMarker};

const adPinIcon = L.icon({
  iconUrl: '/leaflet/images/marker-icon.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export {adPinIcon};

const returnMainPinLocation = () => {
  mainPinMarker.setLatLng({
    lat: 35.68951,
    lng: 139.69171,
  });
};

export {returnMainPinLocation};
