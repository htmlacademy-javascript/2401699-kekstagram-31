import { isEscKeydown } from './render-photo';
import { isHashtagValid, error } from './valid-hashtag';

const uploadForm = document.querySelector('.img-upload__form');
const bodyPage = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file'); //id
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelBtn = document.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

//выз колбэк closePhotoEditor- делает обратное доб все удаляет
const onPhotoCancelBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  //пров что именно эскейп
  if(isEscKeydown(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput) {
      //помогает предотвратить активацию событий на родительских элементах после того, как они сработали на дочернем элементе.
      evt.stopPropagation();
      //сброс знач формы
    } else {
      //сбрасивыем знач форм
      uploadForm.reset();
      //вызываем то что до ()
      closePhotoEditor();
    }
  }
};

//ф закр мод окна
function closePhotoEditor () {
  //когда случ lj, хиден
  uploadOverlay.classList.add('hidden');
  //веш на боди класс
  bodyPage.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  //кнопка на ней соб
  uploadCancelBtn.addEventListener('click', onPhotoCancelBtnClick);
  uploadFile.value = '';
}

// выбор файла с изображением для загрузки;
export const initUploadModal = () => {
  //доб просл соб change-(изм соб инпута)
  uploadFile.addEventListener('change', () => {
    //когда случается уд hidden
    uploadOverlay.classList.remove('hidden');
    //веш на body класс
    bodyPage.classList.add('modal-open');
    //кнопка на ней соб
    uploadCancelBtn.addEventListener('click', onPhotoCancelBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

//валидпция хэштегов
const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper', // Эл д/добавления классов
  errorTextClass: 'img-upload__field-wrapper--error', //класс д/эл с ошибкой
  errorTextParent: 'img-upload__field-wrapper', //куда выодится текст с ошибкой
  errorTextTag: 'div', //обрамляет текст с ошибкой
});

//кол-во симв коменнтария не должен превышать 140
pristine.addValidator(commentInput, (value) => {
  //(текущая длина)
  const isCorrectLength = value.length <= 140;
  return isCorrectLength;
}, 'Длина комментария не может превышать 140 символов.');

//Добавляем слушатель на форму, при неправильно введённых значениях в форму, отправить невозможно
//в форму передаём ('событие', функцию)
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  //усл- Если "форма валидна", то выполни следующие действие
  if(pristine.validate()) {
    //У хештега убери пробелы по краям и множественные пробелы замени на одиночный и отправь форму
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');
    // М form.submit() позволяет инициировать отправку формы из JavaScript
    uploadForm.submit();
  }
});

//доб валидатор, кладем (инпут функцию и смс об ошибке)
pristine.addValidator(hashtagInput, isHashtagValid, error);
