const checkLength = (charset = ' ', maxLength = 1) => charset.length <= maxLength;

checkLength ();


// функ палиндром туда-сюда читается
const isPalindromeString = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();

  let reversion = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversion += string[i];
  }

  return string === reversion;
};

//функция проверки
isPalindromeString('Лёша на полке клопа нашёл '); // true
