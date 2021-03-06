import {type} from './data.js';
import {adjustNounsToNumber} from './util.js';
import {adPinIcon, map, markerGroup} from './map.js';

const ADS_COUNT = 10;

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const makeAds = (ads) => {
  ads.slice(0, ADS_COUNT).forEach(({location: {lat, lng}, offer, author}) => {
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
    const popupAddress = adItem.querySelector('.popup__text--address');
    const popupPrice = adItem.querySelector('.popup__text--price');
    const popupCapacity = adItem.querySelector('.popup__text--capacity');
    const popupFeaturesList = adItem.querySelector('.popup__features');
    const popupTime = adItem.querySelector('.popup__text--time');
    const popupDescription = adItem.querySelector('.popup__description');
    const popupPhotos = adItem.querySelector('.popup__photos');
    adItem.querySelector('.popup__title').textContent = offer.title;
    offer.address ? popupAddress.textContent = offer.address : popupAddress.remove();
    offer.price ? popupPrice.textContent = `${offer.price} ₽/ночь` : popupPrice.remove();
    adItem.querySelector('.popup__type').textContent = type[offer.type];
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
    offer.checkin && offer.checkout ? popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` :
      popupTime.remove();
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
    offer.description ? popupDescription.textContent = offer.description : popupDescription.remove();
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
    author.avatar ? popupAvatar.src = author.avatar : popupAvatar.remove();

    adPinMarker
      .addTo(markerGroup)
      .bindPopup(adItem);
  });
};

export {makeAds};

const closePopup = () => {
  map.closePopup();
};

export {closePopup};

const cleanMarkers = () => {
  markerGroup.clearLayers();
};

export {cleanMarkers};
