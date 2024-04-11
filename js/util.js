//Тут все, что я могу потом переиспользовать в др проектах
const DEBOUNCE_DELAY = 500;

//ф получение случайного числа - вернет число из заданного диапазона (мин макс)
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//возвр случайного эл массива перенесли [] сюда просто и упростили код
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//функц созд уникального числа
const getUniqueNumber = (min) => {
  let number = min;
  return function () {
    return number++;
  };
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, getUniqueNumber, debounce, isEscapeKey };
