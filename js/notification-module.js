//при отклонениях показать мод окна(уведомления )
import { isEscKeydown } from './render-photo';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMassageElement = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const hideMessage = () => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');//провер
  existElement.remove();//уд мод окно c кнопкой
  body.removeEventListener('click', hideMessage);//уд обр соб
  body.removeEventListener('keydown', hideMessage);
};

const onCloseButtonClick = () => {
  hideMessage();
};

function onDocumentKeydown(evt) {
  if (isEscKeydown) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  hideMessage();
}

const message = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

const closeNotification = () => {
  message(errorMassageElement, '.error__button');
};

const appendNotification = () => {
  message(successMessageElement, '.success__button');
};

export { closeNotification, appendNotification };
