const img = document.querySelector('.img-upload__preview img');//стили css картинки внутри
const smallerElement = document.querySelector ('.scale__control--smaller'); //минус
const biggerElement = document.querySelector ('.scale__control--bigger'); //плюс
const controlValueElement = document.querySelector ('.scale__control--value'); //значение поля

const SCALE_STEP = 0.25;
let scale = 1;

const resetScale = () => {
  scale = 1;
};

//кн уменьшение размера
const onSmalleClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP; //умен размер
    img.style.transform = `scale(${scale})`;//записываем уменьшение размер в style.transform, через знач scale
    controlValueElement.value = `${scale * 100}%`;//изм % в окне
  }
};

//кн увеличение размера
const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    controlValueElement.value = `${scale * 100}%`;
  }
};

function addScalesListeners () {
  smallerElement.addEventListener('click', onSmalleClick);
  biggerElement.addEventListener('click', onBiggerClick);
}

function removeScalesListeners () {
  smallerElement.removeEventListener('click', onSmalleClick);
  biggerElement.removeEventListener('click', onBiggerClick);
}

export { addScalesListeners, removeScalesListeners, resetScale };
