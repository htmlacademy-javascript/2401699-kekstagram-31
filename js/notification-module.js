//при отклонениях показать мод окна(уведомления )
import { isEscapeKey } from './modal-photo';
import { onDocumentKeydown } from './upload-form';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMassageElement = document.querySelector('#error').content.querySelector('.error');
const uploadForm = document.querySelector('.img-upload__form');
const buttonSubmit = uploadForm.querySelector('.img-upload__submit');
const body = document.querySelector('body');

const REMOVE_MESSAGE_TIMEOUT = 5000;//Сообщение при ошибке запроса на сервер

const dataError = document.querySelector('#data-error').content;

//проблема с получением данных ошибка
const showErrorMessage = (message) => {
  const errorArea = dataError.cloneNode(true);

  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  body.append(errorArea);
  const areaError = body.querySelector('.data-error');//добавляется в body ф
  setTimeout(() => {//устанавливаем таймер
    areaError.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

//Интерактивность кнопки "Опубликовать" 2 шаблона
const submitBtnText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const disabledBtn = (text) => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = text;
};

const enableBtn = (text) => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = text;
};

//Сообщениe успех
const closeOutsideModalSuccess = function (clickEvt) {
  const messageOfSuccess = body.querySelector('.success');
  const successInner = messageOfSuccess.querySelector('.success__inner');
  const withinBoundariesSuccess = clickEvt.composedPath().includes(successInner);
  if (!withinBoundariesSuccess) {
    removeSuccessListeners();
  }
};

//Сообщениe ошибка
const closeOutsideModalError = function (clickEvt) {
  const messageOfError = body.querySelector('.error');
  const errorInner = messageOfError.querySelector('.error__inner');
  const withinBoundariesError = clickEvt.composedPath().includes(errorInner);
  if (!withinBoundariesError) {
    removeErrorListeners();
  }
};

const closeSuccessfulByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    removeSuccessListeners();
  }
};

const closeErrorByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    keydownEvt.preventDefault();
    removeErrorListeners();
  }
};

const bySuccessButton = () => {
  removeSuccessListeners();
};

const byErrorButton = () => {
  removeErrorListeners();
};

const handleErrorMessage = function () {
  body.appendChild(errorMassageElement);
  const errorButton = body.querySelector('.error__button');
  document.addEventListener('click', closeOutsideModalError);
  document.addEventListener('keydown', closeErrorByKeydown);
  errorButton.addEventListener('click', byErrorButton);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function removeSuccessListeners () {
  document.removeEventListener('click', closeOutsideModalSuccess);
  document.removeEventListener('keydown', closeSuccessfulByKeydown);
  const successMessage = body.querySelector('.success');
  successMessage.parentNode.removeChild(successMessage);
}

const handleSuccessMessage = function () {
  body.appendChild(successMessageElement);
  const successButton = body.querySelector('.success__button');
  document.addEventListener('click', closeOutsideModalSuccess);
  document.addEventListener('keydown', closeSuccessfulByKeydown);
  successButton.addEventListener('click', bySuccessButton);
};

function removeErrorListeners () {
  document.removeEventListener('click', closeOutsideModalError);
  document.removeEventListener('keydown', closeErrorByKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
  const errorMessage = body.querySelector('.error');
  errorMessage.parentNode.removeChild(errorMessage);
}

export { showErrorMessage, submitBtnText, disabledBtn, enableBtn, handleErrorMessage, handleSuccessMessage };
