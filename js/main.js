import './functions.js';
import './render-photo.js';
import './render-comments.js';
import { openPicture } from './render-photo.js';
import { initUploadModal } from './form.js';
import './valid-hashtag.js';
import { similarPhoto } from './thumbnails.js';
import { getData } from './api.js';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');

getData()
  .then((photos) => {
    similarPhoto(photos);
  }).catch(() => {
    document.body.append(dataError);
    setTimeout(() => document.body.removeChild(dataError), 5000);
  });

openPicture();
initUploadModal();
