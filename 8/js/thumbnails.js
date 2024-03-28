import {similarVariableLength} from './create-info-photo.js';
//ищем tempate и через content.querySelector нах нужное нам содержимое

//сначала 1 фото сделаем
const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
//интернирование метод хранения лишь одной копии из многих одинаковых объектов.
const similarVariableLengthFragment = document.createDocumentFragment();

const similarPhoto = similarVariableLength();

similarPhoto.forEach(({url, id, comments, likes}) => {
  const thumbnail = template.cloneNode(true);

  //Адрес изображения url подставьте как атрибут src изображения.   //по qeury селектор дописать url scr ссылку
  thumbnail.querySelector('.picture__img').src = url;
  //чтобы программа понимала что именно по нужному фото кликаем доб id (dataset.pictureId жту чать просто запомнить синстаксис )
  thumbnail.dataset.pictureId = id;
  //Количество комментариев comments выведите в блок .picture__comments.
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  //Количество лайков likes выведите в блок .picture__likes.
  thumbnail.querySelector('.picture__likes').textContent = likes;

  //ретюн возврат функции выше
  similarVariableLengthFragment.append(thumbnail);
});

//закомит результат в дом
container.append(similarVariableLengthFragment);

export {container, template, similarPhoto};
