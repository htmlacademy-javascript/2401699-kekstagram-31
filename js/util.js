//Тут все, что я могу потом переиспользовать в др проектах

//функция чтобы получить случайное число - функ вернет чилсло из заданного диапазона мин макс
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//возвр случ эл массива перенесли [] сюда просто и упростили код
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//функц созд уникального числа
const getUniqueNumber = () => {
  let number = 0;
  return function () {
    return number++;
  };
};

export {getRandomInteger, getRandomArrayElement, getUniqueNumber, };
