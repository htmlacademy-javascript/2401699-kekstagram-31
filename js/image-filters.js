import { renderThumbnails } from './thumbnails';
import { debounce } from './util';

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNCTION = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const MAX_PICTURE_COUNT = 10;

let pictures = [];
let defaultFilter = FILTER.default;
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
  if (defaultFilter === FILTER.default) {//проверка
    filteredPictures = pictures;//исходная картинка
  }
  if (defaultFilter === FILTER.random) {
    filteredPictures = pictures.toSorted(SORTFUNCTION.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (defaultFilter === FILTER.discussed) {
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
