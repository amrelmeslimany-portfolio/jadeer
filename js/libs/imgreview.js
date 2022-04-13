$.fn.imgPreview = function (options) {
  let { imgPreview: imgPreviewWrap, imgActions, imgInput } = options;
  let imgUploadBTN = imgActions.find(".img-upload-btn");
  let defaultIMG = imgPreviewWrap.find("img");

  // Click upload btn
  imgUploadBTN.click(() => imgInput.click());
  imgInput.on("change", function () {
    let imgPreviewIMG = imgPreviewWrap.find("img");
    // Remove images if founded
    removeImages(imgPreviewIMG);
    readURL(this, imgPreviewWrap, imgActions, imgUploadBTN, defaultIMG);
  });
};

const readURL = function (input, preview, imgActions, uploadBTN, defaultImage) {
  let initialIcon = preview.find("i");

  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      let result = e.target.result;
      initialIcon.hide(200);

      preview.append(`<img src="${result}" alt="name" />`);

      // Change upload btn to remove btn
      imgActions.append(changeUploadToRemoveBTN(uploadBTN));

      // Clear image when click on remove image
      $(".img-remove-btn").click(() => {
        if (defaultImage.length) {
          removeImages(preview.find("img"));
          preview.append(defaultImage);
        } else {
          removeImages(preview.find("img"));
          initialIcon.show(200);
          input.value = "";
        }
        changeUploadToRemoveBTN(uploadBTN, "uTOr");
      });
    };

    reader.readAsDataURL(input.files[0]);
  }
};

// clear images
const removeImages = function (img) {
  if (img.length) {
    img.remove();
  }
};

function changeUploadToRemoveBTN(uploadBTN, actionType = "rTOu") {
  // rTOu -> RemoveToUpload
  if (actionType === "rTOu") {
    let copied = uploadBTN.clone();
    let icon = copied.find("i");

    uploadBTN.hide();

    copied.removeClass("img-upload-btn");
    icon.removeClass("fa-camera-alt");

    copied.addClass("img-remove-btn");
    icon.addClass("fa-times");

    return copied;
  } else {
    $(".img-remove-btn").hide(200, function () {
      $(".img-remove-btn").remove();
    });
    uploadBTN.show(200);
  }
}
