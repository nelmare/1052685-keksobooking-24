import {type} from './data.js';
import {adjustNounsToNumber} from './util.js';
import {adPinIcon, map} from './map.js';
// import {filteredAds} from './api.js';
// import {isHousingFilterOptionSelected} from './filter.js';
// import {filteredAds} from './api.js';

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

// let filteredAds;

const makeAds = (ads) => {
  ads.forEach(({location: {lat, lng}, offer, author}) => {
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
    if (offer.features) {
      offer.features.forEach((feature) => {
        const popupFeaturesItem = document.createElement('li');
        popupFeaturesItem.classList.add('popup__feature');
        popupFeaturesItem.classList.add(`popup__feature--${feature}`);
        popupFeaturesItem.textContent = feature;
        popupFeaturesList.append(popupFeaturesItem);
      });
    } else {
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
    if (offer.photos) {
      offer.photos.forEach((photo) => {
        const popupPhoto = document.createElement('img');
        popupPhoto.classList.add('popup__photo');
        popupPhoto.src = photo;
        popupPhoto.width = 45;
        popupPhoto.height = 40;
        popupPhotos.append(popupPhoto);
      });
    } else {
      popupPhotos.remove();
    }
    const popupAvatar = adItem.querySelector('.popup__avatar');
    if (author.avatar) {
      popupAvatar.src = author.avatar;
    } else {
      popupAvatar.remove();
    }

    const adsFilter = document.querySelector('.map__filters');
    const housingTypeFilter = adsFilter.querySelector('#housing-type');
    const housingTypeFilterOption = housingTypeFilter.querySelector('option');
    let housingType;
    housingTypeFilter.addEventListener('change', (evt) => {
      housingType = evt.target.value;
      housingTypeFilterOption.value = housingType;
    });
    const isHousingFilterOptionSelected = (ad) => housingType === ad.type;
    ads.filter(isHousingFilterOptionSelected);

    adPinMarker
      .addTo(map)
      .bindPopup(adItem);
  });
};

const closePopup = () => {
  map.closePopup();
};

const cleanPopup = () => {
  map.clearLayers();
};


export {makeAds, closePopup};


