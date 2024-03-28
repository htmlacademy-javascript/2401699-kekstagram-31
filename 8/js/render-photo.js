import { container, similarPhoto } from './thumbnails.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPictureSection = document.querySelector('.big-picture'); //осн файл с фото
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img'); //адрес изображения
const likesCount = bigPictureSection.querySelector('.likes-count'); //Количество лайков// const socialCommentTotalCount = bigPictureSection.querySelector('.social__comment-total-count'); //Общее количество комментариев к фотографии
const socialCaption = bigPictureSection.querySelector('.social__caption'); //блок с опис комментариев
const userModalCanselElement = bigPictureSection.querySelector('.big-picture__cancel');
const commentsCountShow = bigPictureSection.querySelector('.social__comment-shown-count');

const onBigPictureCancelClick = () => { //доб обработчик нажатия на фото
  closePhoto();
};

//проверка что клавиша эскейп
const onEscKeydown = (evt) => {
  //если мы нажали escape только в это случае делаем closePhoto
  if (evt.key === 'Escape') {
    closePhoto();
  }
};
//в open передали id
const openPhoto = (pictureId) => {
  const currentPhoto = similarPhoto.find((photo) => Number(photo.id) === Number(pictureId));// const currentPhoto = similarPhoto.find((photo) => photo.id === Number(pictureId)); //нах объект соответствующий нашему айди find метом поиска которыйвозвр три или фалс емли не нашел андефаинд

  //ниже что куда всавляется(куда лайки/комментарии и т.д)
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  commentsCountShow.textContent = currentPhoto.comments.length;
  socialCaption.textContent = currentPhoto.description; //доб комментария

  renderComments(currentPhoto.comments);
  bigPictureSection.classList.remove('hidden');
  userModalCanselElement.addEventListener('click', closePhoto); //нижние строки обработчик нажатия по крестику также
  document.body.classList.add('modal-open'); //доб класс в ()
  document.addEventListener('keydown', closePhoto);
};

//контейнер где все фото вешаем обработчик (событие где функц произойдет тогда когда будет наж на этот элемент или на его дочерний)
const openPicture = () => {
  container.addEventListener('click', (evt) => {
    //проверка что точно нажали по пикчер либо на эл внутри по отн к нему
    const currentPhoto = evt.target.closest('.picture');

    //если тот эл возвр тру и тогда выз функц которая доб большое фото
    if (currentPhoto) {
      evt.preventDefault();
      //если тру тогда выз функц и доб по id(dataset picture-id простопринятьчо слитно )
      openPhoto(currentPhoto.dataset.pictureId);
    }
  });
};

function closePhoto () {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open'); //доб класс в ()
  userModalCanselElement.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);

  //при закр старой фото очищаем все лишнее комментарии тд
  clearComments();
}

export { openPicture, onEscKeydown };
