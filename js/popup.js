import {data} from './data.js';
import {declOfNum} from './util.js';

const adsDisplay = document.querySelector('.map');
const adsDisplayList = adsDisplay.querySelector('.map__canvas');
const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('article');

data.forEach((item) => {
  const adItem = similarAdTemplate.cloneNode(true);
  adItem.querySelector('.popup__title').textContent = item.offer.title;
  adItem.querySelector('.popup__text--address').textContent = item.offer.address ? item.offer.address : '';
  adItem.querySelector('.popup__text--price').textContent = item.offer.price ? `${item.offer.price} ₽/ночь` : '';
  switch (item.offer.type) {
    case 'flat':
      adItem.querySelector('.popup__type').textContent = 'квартира';
      break;
    case 'bungalow':
      adItem.querySelector('.popup__type').textContent = 'бунгало';
      break;
    case 'house':
      adItem.querySelector('.popup__type').textContent = 'дом';
      break;
    case 'palace':
      adItem.querySelector('.popup__type').textContent = 'дворец';
      break;
    case 'hotel':
      adItem.querySelector('.popup__type').textContent = 'отель';
      break;
  }
  const roomsForm = item.offer.rooms ? declOfNum(item.offer.rooms, ['комната', 'комнаты', 'комнат']) : '';
  const guestsForm = item.offer.guests ? declOfNum(item.offer.guests, ['гостя', 'гостей', 'гостей']) : '';
  adItem.querySelector('.popup__text--capacity').textContent = item.offer.rooms  ? `${item.offer.rooms} ${roomsForm} ` : '';
  adItem.querySelector('.popup__text--capacity').textContent += item.offer.guests  ? `для ${item.offer.guests} ${guestsForm}` : '';
  adItem.querySelector('.popup__text--time').textContent = item.offer.checkin && item.offer.checkout ? `Заезд после
  ${item.offer.checkin}, выезд до ${item.offer.checkout}` : '';
  adItem.querySelector('.popup__features').textContent = item.offer.features ? item.offer.features.join(', ') : '';
  adItem.querySelector('.popup__description').textContent = item.offer.description ? item.offer.description : '';
  adItem.querySelector('.popup__photos').textContent = item.offer.photos ? item.offer.photos.join(', ') : '';
  adItem.querySelector('.popup__avatar').src = item.author.avata ? item.author.avatar : '';
  adsDisplayList.appendChild(adItem);
});
