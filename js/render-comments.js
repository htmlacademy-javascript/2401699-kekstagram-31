const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPictureSection = document.querySelector('.big-picture');
const socialComments = bigPictureSection.querySelector('.social__comments'); //Общее количество комментариев к фотографии
const socialComment = bigPictureSection.querySelector('.social__comment');
const newCommentsLoader = bigPictureSection.querySelector('.comments-loader');
const commentsCountShow = bigPictureSection.querySelector('.social__comment-shown-count');
const countTotalComments = bigPictureSection.querySelector('.social__comment-total-count');//125

socialComments.innerHTML = '';

const renderNextComments = () => {

  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);//проходит по списку renderedComments = берем глобальную перем comments (slice- нарез от одного эл до какого-то)
  const renderedCommentsLength = renderedComments.length + currentCount;//вытаскиваем длину массива плюс сколько комментариев

  renderedComments.forEach((comment) => {//отрисовка фотографий проходимся по комментариям через .forEach
    const socialCommentNode = socialComment.cloneNode(true); //создаем переменную, заполняем ее элемнту ниже, обяз через клонирование- сложная ссылка
    const authorOfComment = socialCommentNode.querySelector('.social__picture');

    authorOfComment.src = comment.avatar;
    authorOfComment.alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;
    socialComments.append(socialCommentNode);//до фрагмент

    commentsCountShow.textContent = renderedCommentsLength;
  });

  countTotalComments.textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {//если значение комментариев >= общего кол-ва длины коменнтариев
    newCommentsLoader.classList.add('hidden');//тогда удаляем кнопку загрузить
  }
  currentCount += COUNT_STEP;//записыв то на сколько увеличиваем было 0 => 5
};

//Очистка всего при закрытии фото
const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  newCommentsLoader.classList.remove('hidden');
  newCommentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {//в renderComments передается массив(currentPhotoComments) комментариев
  comments = currentPhotoComments; //глобальный массив присваиваем ему то что пришло из renderComments
  renderNextComments();
  newCommentsLoader.addEventListener('click', renderNextComments);//доб обработчик по клику (внизу загрузить еще) renderNextComments функ вызова фото
};

export { clearComments, renderComments };
