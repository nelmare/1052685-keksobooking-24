import {doFormActive} from './util.js';
import {adForm} from './form.js';
import {mapFilters} from './form.js';
import {updateAddressInputByPin} from './ad-form.js';

const MainMarkerLocation = {
  lat: 35.68950,
  lng: 139.69171,
};

export {MainMarkerLocation};

const map = L.map('map-canvas')
  .on('load', () => {
    doFormActive(adForm, 'ad-form--disabled');
    doFormActive(mapFilters, 'map__filters--disabled');
  })
  .setView({
    lat: MainMarkerLocation.lat,
    lng: MainMarkerLocation.lng,
  }, 10);

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

const returnMainPinLocation = () => {
  mainPinMarker.setLatLng({
    lat: 35.68951,
    lng: 139.69171,
  });
};

export {adPinIcon, returnMainPinLocation, map};
