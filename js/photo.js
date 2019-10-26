'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var defaultAvatarSrc = previewAvatar.src;
  var containerPhotoHouse = document.querySelector('.ad-form__photo-container');
  var fileChooserPhotoHouse = document.querySelector('.ad-form__input');
  var previewPhotoHouse = document.querySelector('.ad-form__photo');

  var createImg = function () {
    var cloneDiv = previewPhotoHouse.cloneNode(false);
    cloneDiv.classList.remove('visually-hidden');
    previewPhotoHouse.classList.add('visually-hidden');
    cloneDiv.style.display = 'flex';
    cloneDiv.style.alignItems = 'center';
    var photoHouse = document.createElement('img');
    cloneDiv.appendChild(photoHouse);
    photoHouse.style.width = '40px';
    photoHouse.style.height = '40px';
    photoHouse.style.margin = 'auto';
    containerPhotoHouse.appendChild(cloneDiv);
    return photoHouse;
  };

  var changeAvatar = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (preview !== previewAvatar) {
            preview = createImg();
          }
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  changeAvatar(fileChooserAvatar, previewAvatar);
  changeAvatar(fileChooserPhotoHouse);

  var resetPreviewPhoto = function () {
    previewAvatar.src = defaultAvatarSrc;
    previewPhotoHouse.classList.remove('visually-hidden');
    var photosPreview = containerPhotoHouse.querySelectorAll('.ad-form__photo');
    for (var i = 1; i < photosPreview.length; i++) {
      photosPreview[i].remove();
    }
  };

  window.photo = {
    resetPreviewPhoto: resetPreviewPhoto
  };
})();
