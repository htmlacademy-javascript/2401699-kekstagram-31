import { renderThumbnails } from './thumbnails';
import { debounce } from './util';

const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const SORTFUNCTION = {
  RANDOM: () => 0.5 - Math.random(),
  DISCUSSED: (a, b) => b.comments.length - a.comments.length,
};

const MAX_PICTURE_COUNT = 10;

let pictures = [];
let defaultFilter = FILTER.DEFAULT;
const filterElement = document.querySelector('.img-filters');
const debounceRender = debounce(renderThumbnails);

function onFilterChange(evt) {
  const targetButton = evt.target;//кн на которую нажали
  const activeButton = document.querySelector('.img-filters__button--active');
  if (!targetButton.matches('button')) { //проверка что точно по клику попали на кнопку
    return;
  } if (activeButton === targetButton) { //сравнение активности и нажатия кнопки
    return;
  }
  activeButton.classList.toggle('img-filters__button--active');//отк класс подсветки
  targetButton.classList.toggle('img-filters__button--active');//вкл класс подсветки
  defaultFilter = targetButton.getAttribute('id'); //сохранение нажатой кнопки

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];
  if (defaultFilter === FILTER.DEFAULT) {//проверка
    filteredPictures = pictures;//исходная картинка
  }
  if (defaultFilter === FILTER.RANDOM) {
    filteredPictures = pictures.toSorted(SORTFUNCTION.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (defaultFilter === FILTER.DISCUSSED) {
    filteredPictures = pictures.toSorted(SORTFUNCTION.discussed);//по убыванию кол-ва комментариев
  }
  debounceRender(filteredPictures);//вызов с задержкой отрисованных фото
}

function configFilter(picturesData) { //настройки первичные
  filterElement.classList.remove('img-filters--inactive');//удаляем класс, чтобы быть видимым
  filterElement.addEventListener('click', onFilterChange);//вешаем обратно
  pictures = picturesData; //сохранение в локальной копии
}

export { configFilter };
