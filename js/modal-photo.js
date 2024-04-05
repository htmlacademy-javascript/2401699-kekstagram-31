import { container, photosList } from './thumbnails.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPictureSection = document.querySelector('.big-picture'); //осн файл с фото
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img'); //адрес изображения
const likesCount = bigPictureSection.querySelector('.likes-count'); //Количество лайков
const socialCaption = bigPictureSection.querySelector('.social__caption'); //блок с опис комментариев
const userModalCanselElement = bigPictureSection.querySelector('.big-picture__cancel');
const commentsCountShow = bigPictureSection.querySelector('.social__comment-shown-count');

const onBigPictureCancelClick = () => { //доб обработчик нажатия на фото
  closePhoto();
};

const isEscKeydown = (evt) => {//проверка что клавиша ecs

  if (evt.key === 'Escape') { //если мы нажали escape только в это случае делаем closePhoto
    closePhoto();
  }
};
const openPhoto = (pictureId) => {
  const currentPhoto = photosList.find((photo) => Number(photo.id) === Number(pictureId));
  bigPictureImg.src = currentPhoto.url; //ниже что куда всавляется(куда лайки/комментарии и т.д)
  likesCount.textContent = currentPhoto.likes;
  commentsCountShow.textContent = currentPhoto.comments.length;
  socialCaption.textContent = currentPhoto.description; //доб комментария

  renderComments(currentPhoto.comments);
  bigPictureSection.classList.remove('hidden');
  userModalCanselElement.addEventListener('click', closePhoto); //нижние строки обработчик нажатия по крестику также
  document.body.classList.add('modal-open'); //доб класс в ()
  document.addEventListener('keydown', closePhoto);
};

//открытие фото
const openPicture = () => {//событие где функц произойдет тогда когда будет наж на этот элемент или на его дочерний
  container.addEventListener('click', (evt) => {
    const currentPhoto = evt.target.closest('.picture'); //проверка что точно нажали по picture, либо на эл внутри по отношению к нему

    if (currentPhoto) {
      evt.preventDefault(); //если true тогда выз функц и доб по id(dataset picture-id простопринятьчо слитно )
      openPhoto(currentPhoto.dataset.pictureId);
    }
  });
};

//закрытие фото
function closePhoto () {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open'); //доб класс в ()
  userModalCanselElement.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', isEscKeydown);

  clearComments();//очищаем все лишнее комментарии тд
}

export { openPicture, isEscKeydown, onBigPictureCancelClick };
