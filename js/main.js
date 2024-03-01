
const NAMES = [
  'Артем', 'Светлана', 'Игорь', 'Мария', 'Ксения', 'Петр', 'Иван', 'Владимир','Алексей', 'Ассоль', 'Лилия', 'Максим', 'Константин', 'Евгения', 'Михаил', 'Станислав', 'Елена', 'Александр', 'Марина', 'Вероника', 'Бен', 'Стен', 'Глен', 'Ален', 'Мирослава',
];

const MESSAGES = [
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Всё отлично!',
];

const DESCRIPTIONS = [
  'Иконка с буквой К на коричневом фоне',
  'Иконка колокола на зеленом фоне',
  'Иконка с мороженным на фиолетовом фоне',
  'Иконка с бабочкой на розовом фоне',
  'Иконка снежинки на желтом фоне',
  'Иконка грузовика на голубом фоне',
];

//запишем переменную для числа повтора
const NUMBER_OF_REPOSITIONS = 25;

//функция чтобы получить случайное число - функ вернет чилсло из заданного диапазона мин макс
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//функц созд уникального числа
const getUniqueNumber = () => {
  let number = 0;
  return function () {
    return number++;
  };
};

//возвр случ эл массива перенесли [] сюда просто и упростили код
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//функция создает генерацию данных
//для случаного индекса имен мы передаем min max сюда попадет ранд число
// const randomIndexName = getRandomInteger(0, NAMES.length - 1);
// const randomIndexMessage = getRandomInteger(0, MESSAGES.length - 1);
// const randomIndexDiscription = getRandomInteger(0, DESCRIPTIONS.length - 1);
//но мы запишем сразу так как прогр увидит что это вызов функции (число getRandomInteger перед [] массив имена коммент и тд)
//обращ через квадр не только из-за массива но и потому что вычисляем

//функц получен случайного эл массива
const idPhoto = getUniqueNumber();
const idComment = getUniqueNumber();
const urlNumber = getUniqueNumber();

//функция создания объекта
const createPhoto = () => ({
  id: idComment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getUniqueNumber(NAMES),
});

//функция создания объекта
const createInfoPhoto = () => ({
  id: idPhoto(),
  url: `photos/${urlNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createPhoto),
});

//функ возвр столько скоько нам нужно в данном случае 25 раз (похожийвариант) исп встроенный обьект array он вкл в себя вспомог метод для работы с массива есть фром9принимает настройки массива длина например) фром созд масси в длиной в 25 а все функц будет создавать наш билдер createInfoPhoto
const similarVariableLength = Array.from({length: NUMBER_OF_REPOSITIONS}, createInfoPhoto);

similarVariableLength();
