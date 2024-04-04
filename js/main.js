import './functions.js';
import './render-photo.js';
import './render-comments.js';
import { openPicture } from './render-photo.js';
import { initUploadModal } from './form.js';
import './valid-hashtag.js';
import { renderThumbnails } from './thumbnails.js';
import { savePhoto, copyPhotosArray } from './photo-state.js';
import { getData } from './api.js';
import { showErrorMessage } from './error.js';

const bootstrap = async () => {//доб обр ошибки
  try {//блок исключение если нет сети
    const photos = await getData();
    savePhoto(photos);
    copyPhotosArray(photos);
    renderThumbnails(photos);
  } catch(error) {
    showErrorMessage(error.message);
  }

};

openPicture();
initUploadModal();
bootstrap();
