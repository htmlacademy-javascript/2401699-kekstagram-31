import { openPicture } from './modal-photo.js';
import { initUploadModal, closePhotoEditor } from './upload-form.js';
import { renderThumbnails } from './thumbnails.js';
import { getData } from './api.js';
import { showErrorMessage } from './notification-module.js';
import { configFilter } from './image-filters.js';
import { sendFormData } from './upload-form.js';
import { onFileInputChange } from './upload-form.js';

//добавляем обработчик
getData().then((photos) => {
  renderThumbnails(photos);
  configFilter(photos);
}).catch((error) => {
  showErrorMessage(error.message);
});

openPicture();
initUploadModal();
sendFormData(closePhotoEditor);
onFileInputChange();
