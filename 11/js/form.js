import { isEscKeydown } from './render-photo';
import { isHashtagValid, error } from './valid-hashtag';
import { onEffectChange } from './effects-slider';
import { sendData } from './api';
import { appendNotification } from './notification-module';

const SCALE_STEP = 0.25;

const uploadForm = document.querySelector('.img-upload__form');
const img = document.querySelector('.img-upload__preview img');//стили css картинки внутри
const bodyPage = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file'); //id
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelBtn = document.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const imgUploadEffects = uploadForm.querySelector('.img-upload__effects');


const smallerElement = document.querySelector ('.scale__control--smaller'); //минус
const biggerElement = document.querySelector ('.scale__control--bigger'); //плюс
const controlValueElement = document.querySelector ('.scale__control--value'); //знач поля

//для разблокировки и блокировки кнопки методы
const formSubmitButton = document.querySelector('.img-upload__submit');

//2 шаблона
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const submitButtonText = {
  IDLE: 'Сохранить',//когда ничего не происходит
  SENDING: 'Сохраняю...'//что при отправке
};

const disabledButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;
};

const enableButton = (text) => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = text;
};


//выз колбэк closePhotoEditor- делает обратное доб все удаляет
const onPhotoCancelBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if(isEscKeydown(evt)) { //пров что именно эскейп
    evt.preventDefault();
    // closeEditionForm(form);
    if(document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation(); //помогает предотвратить активацию событий на родительских элементах после того, как они сработали на дочернем элементе.
    } else {
      uploadForm.reset();//сброс знач формы
      closePhotoEditor(); //вызываем то что до ()
    }
  }
};

//ф закр мод окна
function closePhotoEditor () {
  uploadOverlay.classList.add('hidden'); //когда случ lj, хиден
  bodyPage.classList.remove('modal-open'); //веш на боди класс
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelBtn.addEventListener('click', onPhotoCancelBtnClick); //кнопка на ней соб
  uploadFile.value = '';
}

// const closedEditingForm = (formElement) => {
//   resetValidation();//сброс
//   resetScale();
//   resetSlider();
//   formElement.reset();//очищаем форму
// };

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

//Добавляем отправку формы
const sendFormData = async (formElement) => {//в форму передаём ('событие', функцию)
  const isValid = pristine.validate();//провер валидность с помощью pristine
  if(isValid) { //усл- Если "форма валидна", то выполни следующие действие
    disabledButton(submitButtonText.SENDING);//блок кнопку и пишем идет отправка

    try {
      await sendData(new FormData(formElement));//если не выд ошибку вызов ф и появл мод окно
      appendNotification(templateSuccess); //(перед шаблон и ф необяз(триггер) что можно сделать помимо откр мод окна)
    } catch(err) {
      appendNotification(templateError);//шаблон ошибки
    } finally {//это всегда исп несмотря на то что мб выше
      enableButton(submitButtonText.IDLE);//уст текст кнопки
    }
    // closePhotoEditor();
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

let scale = 1;

//кн уменьшение размера
const onSmalleClick = () => {
  if (scale > SCALE_STEP) {
    //умен размер
    scale -= SCALE_STEP;
    //записы ументше размер в style.transform, через знач scale
    img.style.transform = `scale(${scale})`;
    //изм % в окне
    controlValueElement.value = `${scale * 100}%)`;
  }
};

//кн увеличение размера
const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    controlValueElement.value = `${scale * 100}%)`;
  }
};

//доб валидатор, кладем (инпут функцию и смс об ошибке)
pristine.addValidator(hashtagInput, isHashtagValid, error);
smallerElement.addEventListener('click', onSmalleClick);
biggerElement.addEventListener('click', onBiggerClick);
imgUploadEffects.addEventListener('change', onEffectChange);
uploadForm.addEventListener('submit', formSubmitHandler);
