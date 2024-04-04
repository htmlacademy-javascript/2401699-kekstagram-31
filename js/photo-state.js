let photos = [];

const savePhoto = (newPhotos) => {
  photos = newPhotos;
};

//ищет по массиву фото
const getPhotoById = (id) => photos.find((photo) => photo.id === id);

const copyPhotosArray = () => photos.slice();

export { savePhoto, getPhotoById, copyPhotosArray };
