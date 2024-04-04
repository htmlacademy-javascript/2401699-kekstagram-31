const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPictureSection = document.querySelector('.big-picture'); //осн файл с фото
const socialComments = bigPictureSection.querySelector('.social__comments'); //Общее количество комментариев к фотографии
const socialComment = bigPictureSection.querySelector('.social__comment');
const newCommentsLoader = bigPictureSection.querySelector('.comments-loader');
const commentsCountShow = bigPictureSection.querySelector('.social__comment-shown-count');

socialComments.innerHTML = '';

const renderNextComments = () => {

  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);//прох по списку renderedComments = берем глоб перем comments (слайс нарез от одного эл до какого-то)
  const renderedCommentsLength = renderedComments.length + currentCount;//=вытаскиваем длину массива плюс ск комментариев

  renderedComments.forEach((comment) => {//отрисовка фотографий проходимся по комментариям через .forEach
    const socialCommentNode = socialComment.cloneNode(true); //соз перемен заполняем ее 3эл ниже обяз через клонирование сложная ссылка
    const authorOfComment = socialCommentNode.querySelector('.social__picture');

    authorOfComment.src = comment.avatar;
    authorOfComment.alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;
    socialComments.append(socialCommentNode);//lj, ahfuvtyn
  });

  commentsCountShow.textContent = renderedCommentsLength;

  if (renderedCommentsLength >= comments.length) {//если знач комментариев   >= общего кол-ва длины коменнтариев
    newCommentsLoader.classList.add('hidden');//тогда удаляем кнопку загрузить
  }
  currentCount += COUNT_STEP;//записыв то на ск увел было 0 потом 5 и тд
};

const clearComments = () => {//при закр старой фото очищаем все лишнее комментарии тд
  currentCount = 0;
  socialComments.innerHTML = '';
  newCommentsLoader.classList.remove('hidden');
  newCommentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {//в renderComments передается массив(currentPhotoComments) комментариев
  comments = currentPhotoComments; //глобальный массив присваиваем ему то что пришло из рендер коментс
  renderNextComments();

  newCommentsLoader.addEventListener('click', renderNextComments);//доб обработчик по клику (внизу загурзить еще) рендернехткомментс функ вызова фото
};

export { clearComments, renderComments };
