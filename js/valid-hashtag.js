const MAX_NUMBER_HASHTAG = 5;
const MAX_NUMBER_SYMBOL = 20;

let textErrorMessage = '';

const getTextErrorMessage = () => textErrorMessage; //ф вернет textError

const isHashtagValid = (value) => {
  textErrorMessage = ''; //обнуляем предыдушие ошибки

  const inputText = value.toLowerCase().trim(); //берем знач переводим к нижнему регистру и обрезаем от пробелов по бокам(trim) мал и большая буквы- одинаковое

  if (!inputText) { //проверка на обяз или необяз хештегов если нет верни true
    return true;
  }

  const inputArray = inputText.split(/\s+/); //разделяем строку на куски (\s) символ пробела тоже что и ('')


  //получаем массив из хэштегов раздел массивами
  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа \'#\'!'
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из решётки!'
    },
    {
      check: inputArray.some((item) => item.length > MAX_NUMBER_SYMBOL),
      error: `Максимальная длина одного хэштега ${MAX_NUMBER_SYMBOL} символов, включая решётку!`
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги должны разделяться пробелами!'
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться!'
    },
    {
      check: inputArray.length > MAX_NUMBER_HASHTAG,
      error: `Нельзя указывать больше ${MAX_NUMBER_HASHTAG} хэштегов!`
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы!'
    },
  ];

  return rules.every((rule) => { //вызыв у массива every который даст true только если каждый эл массива соответсвует опр условия? ниже колбэк
    const isInvalid = rule.check;
    if (isInvalid) {
      textErrorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export { isHashtagValid, getTextErrorMessage };
