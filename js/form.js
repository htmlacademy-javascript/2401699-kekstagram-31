import { onEscKeydown } from './render-photo';
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
  if(onEscKeydown(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopFile();
      //сброс знач формы
    } else {
      //сбрасивыем знач форм
      uploadForm.reset();
      //вызываем то что до ()
      closePhotoEditor();
    }
  }
};

//функционал закр мод окна
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
// 1 Загрузка нового изображения:

// выбор файла с изображением для загрузки;
export const initUploadModal = () => {
  //доб прослуш соб ченч-(изм соб инпута)
  uploadFile.addEventListener('change', () => {
    //когда случается уд хиден
    uploadOverlay.classList.remove('hidden');
    //веш на боди класс
    bodyPage.classList.add('modal-open');
    //кнопка на ней соб
    uploadCancelBtn.addEventListener('click', onPhotoCancelBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

//валидпция хэштегов
const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper', // Эл д/добавления классов
  errorClass: 'img-upload__field-wrapper--error', //класс д/эл с ошибкой
  // successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper', //куда выодится текст с ошибкой
  errorTextTag: 'div', //обрамляет текст с ошибкой
});

//кол-во симв коменнтария не должен превышать 140
pristine.addValidator(commentInput, (value) => {
  const hasNumber = value.length <= 140;
  return hasNumber;
}, 'Длина комментария не может превышать 140 символов.');

//доб валидатор, кладем (инпут функцию и смс об ошибке)
pristine.addValidator(hashtagInput, isHashtagValid, error);
