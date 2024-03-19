import {NAMES, MESSAGES, DESCRIPTIONS} from './data.js';
import {getRandomInteger, getRandomArrayElement, getUniqueNumber} from './util.js';

//запишем переменную для числа повтора
const NUMBER_OF_REPOSITIONS = 25;

//функция создает генерацию данных
//для случаного индекса имен мы передаем min max сюда попадет ранд число
// const randomIndexName = getRandomInteger(0, NAMES.length - 1);
// const randomIndexMessage = getRandomInteger(0, MESSAGES.length - 1);
// const randomIndexDiscription = getRandomInteger(0, DESCRIPTIONS.length - 1);
//но мы запишем сразу так как прогр увидит что это вызов функции (число getRandomInteger перед [] массив имена коммент и тд)
//обращ через квадр не только из-за массива но и потому что вычисляем

//функц получен случайного эл массива
const idPhoto = getUniqueNumber(1, 25);
const idComment = getUniqueNumber(1, 1000);
const urlNumber = getUniqueNumber(1, 25);

//функция создания объекта
const createPhoto = () => ({
  id: idComment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getUniqueNumber(NAMES),
});

//функция создания объекта
const createInfoPhoto = () => ({
  id: idPhoto,
  url: `photos/${urlNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createPhoto),
});

//функ возвр столько скоько нам нужно в данном случае 25 раз (похожийвариант) исп встроенный обьект array он вкл в себя вспомог метод для работы с массива есть фром9принимает настройки массива длина например) фром созд масси в длиной в 25 а все функц будет создавать наш билдер createInfoPhoto
const similarVariableLength = () => Array.from({length: NUMBER_OF_REPOSITIONS}, createInfoPhoto);

export {similarVariableLength};
