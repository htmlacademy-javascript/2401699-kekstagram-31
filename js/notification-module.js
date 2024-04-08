//при отклонениях показать мод окна(уведомления )
import { isEscKeydown } from './modal-photo';

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
body.appendChild(successMessageElement);
const messageOfSuccess = body.querySelector('.success');
messageOfSuccess.classList.add('hidden');
const successInner = messageOfSuccess.querySelector('.success__inner');
const successBtn = successInner.querySelector('.success__button');

//Сообщениe ошибка
body.appendChild(errorMassageElement);
const messageOfError = body.querySelector('.error');
messageOfError.classList.add('hidden');
const errorInner = messageOfError.querySelector('.error__inner');
const errorBtn = errorInner.querySelector('.error__button');

const closeSuccessfulByClick = function (evt) {
  if (messageOfSuccess === evt.target) {
    messageOfSuccess.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByClick = function (evt) {
  if (messageOfError === evt.target) {
    messageOfError.classList.add('hidden');
    removeErrorListeners();
  }
};

const closeSuccessfulByKeydown = function (keydownEvt) {
  if (isEscKeydown(keydownEvt)) {
    messageOfSuccess.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByKeydown = function (keydownEvt) {
  if (isEscKeydown(keydownEvt)) {
    messageOfError.classList.add('hidden');
    removeErrorListeners();
  }
};

const bySuccessBtn = () => {
  messageOfSuccess.classList.add('hidden');
  removeSuccessListeners();
};

const byErrorBtn = () => {
  messageOfError.classList.add('hidden');
  removeErrorListeners();
};

const handleSuccessMessage = function () {
  document.addEventListener('click', closeSuccessfulByClick);
  document.addEventListener('keydown', closeSuccessfulByKeydown);
  successBtn.addEventListener('click', bySuccessBtn);
};

function removeSuccessListeners () {
  document.removeEventListener('click', closeSuccessfulByClick);
  document.removeEventListener('keydown', closeSuccessfulByKeydown);
  successBtn.removeEventListener('click', bySuccessBtn);
}

const handleErrorMessage = function () {
  document.addEventListener('click', closeErrorByClick);
  document.addEventListener('keydown', closeErrorByKeydown);
  errorBtn.addEventListener('click', byErrorBtn);
};

function removeErrorListeners () {
  document.removeEventListener('click', closeErrorByClick);
  document.removeEventListener('keydown', closeErrorByKeydown);
  errorBtn.removeEventListener('click', byErrorBtn);
}

export {showErrorMessage, disabledBtn, enableBtn, submitBtnText, handleSuccessMessage, handleErrorMessage,
  messageOfSuccess, messageOfError};
