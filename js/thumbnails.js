import {similarVariableLength} from './create-info-photo.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const similarPhoto = similarVariableLength();

let photosList;

//cоздаем 1 фото
const renderThumbnails = (photos) => {
  const similarVariableLengthFragment = document.createDocumentFragment(); //интернирование метод хранения лишь одной копии из многих одинаковых объектов.
  photosList = photos;
  similarPhoto.forEach(({url, id, comments, likes}) => {
    const thumbnail = template.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url; //Адрес изображения url подставьте как атрибут src изображения.   //по qeury селектор дописать url scr ссылку
    thumbnail.dataset.pictureId = id; //чтобы программа понимала что именно по нужному фото кликаем доб id (dataset.pictureId жту чать просто запомнить синстаксис )
    thumbnail.querySelector('.picture__comments').textContent = comments.length; //Количество комментариев comments выведите в блок .picture__comments.
    thumbnail.querySelector('.picture__likes').textContent = likes; //Количество лайков likes выведите в блок .picture__likes.
    similarVariableLengthFragment.append(thumbnail); //ретюн возврат функции выше

  });
  container.append(similarVariableLengthFragment); //закомит результат в дом

};

export { container, template, renderThumbnails, photosList };
