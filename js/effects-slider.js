const img = document.querySelector('.img-upload__preview');//стили css картинки внутри
const valueEffect = document.querySelector ('.effect-level__value'); //Уровень эффекта записывается в поле  в виде числа.
const levelEffectUpload = document.querySelector ('.img-upload__effect-level'); //контейнер д/скрытия при выборе оригинала
const sliderElement = document.querySelector ('.effect-level__slider');

noUiSlider.create(sliderElement, {
  start: 1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

//обновляем input вызов при изм положении слайдера on-м (слуш соб)
sliderElement.noUiSlider.on('update', () => {
  //если из то изм знач в поле ввода(value запис в св-во)
  valueEffect.value = sliderElement.noUiSlider.get();
});

levelEffectUpload.classList.add('hidden');

const onEffectChange = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    levelEffectUpload.classList.add('hidden');
  } else {
    levelEffectUpload.classList.remove('hidden');
  }

  switch (effect) {
    case 'none':
      img.style.filter = 'none';
      break;
    case 'chrome':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 100,
        step: 0.1,
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `grayscale(${valueEffect.value})`;
      });
      break;
    case 'sepia':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 100,
        step: 0.1,
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `sepia(${valueEffect.value})`;
      });
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `invert(${valueEffect.value}%)`;
      });
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `blur(${valueEffect.value}px)`;
      });
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `brightness(${valueEffect.value})`;
      });
  }
};
console.log(onEffectChange);
export { onEffectChange };
