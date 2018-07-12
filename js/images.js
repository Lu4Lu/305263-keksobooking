'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // var avatarSize = {
  //   WIDTH: 70,
  //   HEIGHT: 70
  // };

  var avatarFileChooserElement = document.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var photoContainerElement = document.querySelector('.ad-form__photo');
  var photoUploadElement = document.querySelector('.ad-form__upload input[type=file]');

  function onPhotoUpload(inputFile, inputPhoto) {
    var file = inputFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        inputPhoto.src = reader.result;
        inputPhoto.width = 70;
        inputPhoto.height = 70;
        inputPhoto.margin = 0;
      });

      reader.readAsDataURL(file);
    }
  }

  function onApartmentPhotosUpload() {
    var newPhoto = document.createElement('img');
    newPhoto.classList.add('ad-form__photo-image');
    newPhoto.width = 70;
    newPhoto.height = 70;
    newPhoto.alt = 'Фото жилья';
    photoContainerElement.appendChild(newPhoto);
    onPhotoUpload(photoUploadElement, newPhoto);
  }

  photoUploadElement.addEventListener('change', function () {
    onApartmentPhotosUpload();
  });

  avatarFileChooserElement.addEventListener('change', function () {
    onPhotoUpload(avatarFileChooserElement, avatarPreviewElement);
  });
})();
