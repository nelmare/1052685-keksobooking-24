import {data} from './data.js';
import {type} from './data.js';
import {adjustNounsToNumber} from './util.js';

const adsDisplay = document.querySelector('.map');
const adsDisplayList = adsDisplay.querySelector('.map__canvas');
const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('article');

data.forEach(({author, offer}) => {
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
  const popupFeaturesListFragment = document.createDocumentFragment();
  offer.features.forEach(() => {
    if (offer.features) {
      const popupFeaturesItem = document.createElement('li');
      popupFeaturesItem.classList.add('popup__feature');
      popupFeaturesItem.classList.add(`popup__feature--${offer.feature}`);
      popupFeaturesItem.textContent = offer.feature;
      popupFeaturesListFragment.append(popupFeaturesItem);
    } else {
      popupFeaturesList.remove();
    }
  });
  const popupDescription = adItem.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.remove();
  }
  const popupPhotos = adItem.querySelector('.popup__photos');
  if (offer.photos) {
    popupPhotos.textContent = offer.photos.join(', ');
  } else {
    popupPhotos.remove();
  }
  const popupAvatar = adItem.querySelector('.popup__avatar');
  popupAvatar.src = author.avatar;
  adsDisplayList.appendChild(adItem);
});
