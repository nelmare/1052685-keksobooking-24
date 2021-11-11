const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview');
const photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreviewContainer = document.querySelector('.ad-form__photo');

const isFileTypeMatching = (element) => {
  const file = element.files[0];
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((item) => fileName.endsWith(item));
};

const getImageSrc = (element, imageContainer) => {
  if (isFileTypeMatching(element)) {
    imageContainer.querySelector('img').src = URL.createObjectURL(element.files[0]);
  }
};

const onImageInputGetAvatarPreview = () => {
  getImageSrc(avatarFileChooser, avatarPreviewContainer);
};

avatarFileChooser.addEventListener('change', onImageInputGetAvatarPreview);

const createPhotoPreview = (element) => {
  if (isFileTypeMatching(element)) {
    const housingPhoto = document.createElement('img');
    housingPhoto.setAttribute('src', URL.createObjectURL(element.files[0]));
    housingPhoto.setAttribute('accept', 'image/png, image/jpeg');
    housingPhoto.width = 69;
    housingPhoto.height = 69;
    photoPreviewContainer.style.display = 'flex';
    housingPhoto.style.marginRight = '10px';
    photoPreviewContainer.appendChild(housingPhoto);
  }
};

const onImageInputGetPhotoPreview = () => {
  createPhotoPreview(photoFileChooser);
};

photoFileChooser.addEventListener('change', onImageInputGetPhotoPreview);
