import {doFormActive} from './util.js';
import {adForm} from './form.js';
import {mapFilters} from './form.js';
import {updateAddressInputByPin} from './ad-form.js';
import {data} from './data.js';
import {type} from './data.js';
import {adjustNounsToNumber} from './util.js';

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
    lat: 35.68950,
    lng: 139.69171,
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

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

data.forEach(({location: {lat, lng}, offer, author}) => {
  const adPinMarker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: adPinIcon,

    },
  );

  const adItem = similarAdTemplate.cloneNode(true);
  adItem.querySelector('.popup__title').textContent = offer.title;
  const popupAddress = adItem.querySelector('.popup__text--address');
  if (offer.address) {
    popupAddress.textContent = offer.address;
  } else {
    popupAddress.remove();
  }
  const popupPrice = adItem.querySelector('.popup__text--price');
  if (offer.price) {
    popupPrice.textContent = `${offer.price} ₽/ночь`;
  } else {
    popupPrice.remove();
  }
  adItem.querySelector('.popup__type').textContent = type[offer.type];
  const popupCapacity = adItem.querySelector('.popup__text--capacity');
  const roomsNumberNoun = adjustNounsToNumber(offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guestsNumberNoun = adjustNounsToNumber(offer.guests, ['гостя', 'гостей', 'гостей']);
  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = `${offer.rooms} ${roomsNumberNoun} `;
    popupCapacity.textContent += `для ${offer.guests} ${guestsNumberNoun}`;
  } else if (!offer.guests) {
    popupCapacity.textContent = `${offer.rooms} ${roomsNumberNoun}`;
  } else if (!offer.rooms) {
    popupCapacity.textContent = `для ${offer.guests} ${guestsNumberNoun}`;
  } else {
    popupCapacity.remove();
  }
  const popupTime = adItem.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTime.remove();
  }
  const popupFeaturesList = adItem.querySelector('.popup__features');
  popupFeaturesList.innerHTML = '';
  offer.features.forEach((feature) => {
    const popupFeaturesItem = document.createElement('li');
    popupFeaturesItem.classList.add('popup__feature');
    popupFeaturesItem.classList.add(`popup__feature--${feature}`);
    popupFeaturesItem.textContent = feature;
    popupFeaturesList.append(popupFeaturesItem);
  });
  if (!popupFeaturesList.textContent) {
    popupFeaturesList.remove();
  }
  const popupDescription = adItem.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.remove();
  }
  const popupPhotos = adItem.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';
  offer.photos.forEach((photo) => {
    const popupPhoto = document.createElement('img');
    popupPhoto.classList.add('popup__photo');
    popupPhoto.src = photo;
    popupPhoto.width = 45;
    popupPhoto.height = 40;
    popupPhotos.append(popupPhoto);
  });
  const popupAvatar = adItem.querySelector('.popup__avatar');
  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  adPinMarker
    .addTo(map)
    .bindPopup(adItem);
});
