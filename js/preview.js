const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview');
const avatarPreview = avatarPreviewContainer.querySelector('img');
const photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreviewContainer = document.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoFileChooser.addEventListener('change', () => {
  const file = photoFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const housingPhoto = document.createElement('img');
    housingPhoto.setAttribute('src', URL.createObjectURL(file));
    housingPhoto.setAttribute('accept', 'image/png, image/jpeg');
    housingPhoto.width = 69;
    housingPhoto.height = 69;
    photoPreviewContainer.style.display = 'flex';
    housingPhoto.style.marginRight = '10px';
    photoPreviewContainer.appendChild(housingPhoto);
  }
});


