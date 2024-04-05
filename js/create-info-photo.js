import {NAMES, MESSAGES, DESCRIPTIONS} from './data.js';
import {getRandomInteger, getRandomArrayElement, getUniqueNumber} from './util.js';

const NUMBER_OF_REPOSITIONS = 25;

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

//Ф создания объекта(создает публикацию)
const createInfoPhoto = () => {
  const photo = {
    id: idPhoto(),
    url: `../photos/${urlNumber()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createPhoto),
  };
  return photo;
};

//Ф возвращает нужно нам число (похожий вариант), array включает в себя вспомогательный метод для работы с массив
const similarVariableLength = () => Array.from({length: NUMBER_OF_REPOSITIONS}, createInfoPhoto);

export {similarVariableLength};
