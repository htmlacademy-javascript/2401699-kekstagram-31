import {similarVariableLength} from './create-info-photo.js';
//ищем tempate и через content.querySelector нах нужное нам содержимое
const template = document.querySelector('#picture').content.querySelector('.picture');
//сначала 1 фото сделаем
const container = document.querySelector('.pictures');

const similarPhoto = similarVariableLength();
//интернирование метод хранения лишь одной копии из многих одинаковых объектов.
const similarVariableLengthFragment = document.createDocumentFragment();

similarPhoto.forEach((photo) => {
  const thumbnail = template.cloneNode(true);

  //переменная для кода ниже
  const image = thumbnail.querySelector('.picture__img');

  //Адрес изображения url подставьте как атрибут src изображения.   //по qeury селектор дописать url scr ссылку
  image.scr = photo.url;
  //Описание изображения description подставьте в атрибут alt изображения.
  image.alt = photo.description;

  //Количество комментариев comments выведите в блок .picture__comments.
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  //Количество лайков likes выведите в блок .picture__likes.
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
});

//закомит результат в дом
container.appendChild(similarVariableLengthFragment);

export {similarPhoto, container};
