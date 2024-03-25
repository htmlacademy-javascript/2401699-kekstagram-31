import { container, similarPhoto } from './thumbnails.js';

const bigPictureSection = document.querySelector('.big-picture'); //осн файл с фото
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img'); //адрес изображения
const likesCount = bigPictureSection.querySelector('.likes-count'); //Количество лайков// const socialCommentTotalCount = bigPictureSection.querySelector('.social__comment-total-count'); //Общее количество комментариев к фотографии
const socialComments = bigPictureSection.querySelector('.social__comments'); //Общее количество комментариев к фотографии
const socialComment = bigPictureSection.querySelector('.social__comment');
const socialCaption = bigPictureSection.querySelector('.social__caption'); //блок с опис комментариев
const socialCommentCount = bigPictureSection.querySelector('.social__comment-count'); //блок счетчик комментариев
const newCommentsLoader = bigPictureSection.querySelector('.comments-loader');
const userModalCanselElement = bigPictureSection.querySelector('.big-picture__cancel');
const commentsCountShow = bigPictureSection.querySelector('.social__comment-shown-count');

const onBigPictureCancelClick = () => { //доб обработчик нажатия на фото
  closePhoto();
};

const onEscKeydown = (evt) => {
  //если мы нажали escape только в это случае делаем closePhoto
  if (evt.key === 'Escape') {
    closePhoto();
  }
};

function closePhoto() {
  bigPictureSection.classList.add('hidden');
  userModalCanselElement.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
}
//в open передали id
const openPhoto = (pictureId) => {
  const currentPhoto = similarPhoto.find((photo) => photo.id === Number(pictureId)); //нах объект соответствующий нашему айди find метом поиска которыйвозвр три или фалс емли не нашел андефаинд
  const socialCommentsFragment = document.createDocumentFragment();//фрагмент участок где что-то пока что будет хранится под комментарий

  //ниже что куда всавляется(куда лайки/комментарии и т.д)
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  commentsCountShow.textContent = currentPhoto.comments.length;
  socialComments.innerHTML = '';

  currentPhoto.comments.forEach((comment) => { //проходимся по комментариям через .forEach
    const userCommentElement = socialComment.cloneNode(true); //соз перемен заполняем ее 3эл ниже обяз через клонирование сложная ссылка
    userCommentElement.querySelector('.social__picture').src = comment.avatar;
    userCommentElement.querySelector('.social__picture').alt = comment.name;
    userCommentElement.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.append(userCommentElement);//lj, ahfuvtyn
  });

  socialComments.append(socialCommentsFragment); //  socialComments отдаем в (этот эл)

  socialCaption.textContent = currentPhoto.description; //доб комментария
  socialCommentCount.classList.add('hidden');
  newCommentsLoader.classList.add('hidden');

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

export { openPicture };
