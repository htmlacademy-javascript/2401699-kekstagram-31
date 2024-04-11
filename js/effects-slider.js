const img = document.querySelector('.img-upload__preview img');//стили css картинки внутри
const valueEffect = document.querySelector ('.effect-level__value'); //Уровень эффекта записывается в поле  в виде числа.
const levelEffectUpload = document.querySelector ('.img-upload__effect-level'); //контейнер д/скрытия при выборе оригинала
const sliderElement = document.querySelector ('.effect-level__slider');

const STYLE_FILTERS = {
  none: 'none',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

const PICTURE_EFFECTS = {
  none: {},
  chrome: {
    range: { min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  sepia: {
    range: { min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  marvin: {
    range: { min: 0, max: 100},
    start: 100,
    step: 1
  },
  phobos: {
    range: { min: 0, max: 3},
    start: 3,
    step: 0.1
  },
  heat: {
    range: { min: 1, max: 3},
    start: 3,
    step: 0.1
  }
};

const DEFAULT_SLIDER = {
  start: 1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

noUiSlider.create(sliderElement, DEFAULT_SLIDER);

sliderElement.classList.add('hidden');
levelEffectUpload.classList.add('hidden');

//эффекты фото
const onEffectChange = (evt) => {

  const effect = evt.target.value;

  const applyingEffect = PICTURE_EFFECTS[effect];

  sliderElement.noUiSlider.updateOptions(applyingEffect);

  sliderElement.noUiSlider.on('update', () => {//обновляем input вызов при измененном положении слайдера on-м (слушатель событий)
    valueEffect.value = sliderElement.noUiSlider.get();

    function effectPicture(value) {
      if (effect === 'marvin') {
        return `${STYLE_FILTERS[effect]}(${value}%)`;
      } else if (effect === 'phobos') {
        return `${STYLE_FILTERS[effect]}(${value}px)`;
      }

      return `${STYLE_FILTERS[effect]}(${value})`;
    }

    img.style.filter = effectPicture(valueEffect.value);
  });

  if (effect === 'none') {
    img.style.filter = STYLE_FILTERS[effect];
    sliderElement.classList.add('hidden');
    levelEffectUpload.classList.add('hidden');
  } else {
    sliderElement.classList.remove('hidden');
    levelEffectUpload.classList.remove('hidden');
  }
};

export { onEffectChange };
