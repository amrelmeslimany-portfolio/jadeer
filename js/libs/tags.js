$.fn.tags = function ({ tagsList }) {
  let form = this.find(".tagify");
  // Remove Default Tags
  if (tagsList.length) {
    let tagWrap = tagsList.find(".tag-item-wrap");

    // Remove Default Tags when user click on remove btn
    tagWrap.each(function () {
      let removeBTN = $(this).find(".remove-tag");
      // On Click remove tag
      removeBTN.click(function () {
        removeAndAppendTag($(this), form);
      });
    });
  }

  // When click on option in select item
  form.on("change", function (e) {
    let tagvalue = $(this).val();
    let selected = $(":selected", this);
    let tagimg = $(":selected", this).data("tagimg").trim();
    let tagcontent = $(":selected", this).text().trim();

    // insert new tag to list
    tagsList.prepend(tagHTML(tagimg, tagcontent, tagvalue));

    // Then remove the selected value from select form
    selected.remove();

    // Get tag item again and remove what the user will remove
    $(".tags-list .tag-item-wrap").each(function () {
      $(this)
        .find(".remove-tag")
        .click(function () {
          removeAndAppendTag($(this), form);
        });
    });
  });
};

function removeTag(tag) {
  tag.hide(200, function () {
    $(this).remove();
  });
}

function removeAndAppendTag(button, form) {
  let thisTagWrap = button.parent();
  let value = button.data("tagotion-value").toString();
  let img = thisTagWrap.find("img").attr("src");
  let content = thisTagWrap.find(".badge-text").text().trim();
  // Remove Tag
  removeTag(thisTagWrap);

  // After remove tag , return it to select form
  form.append(optionHTML(content, img, value));
}

function tagHTML(img, content, value) {
  return `
  <li class="d-flex align-items-center gap-2 tag-item-wrap" >
  <div class="badge rounded-pill bg-light-gray text-primary px-5 py-2">
      <img src="${img}" class="me-2" width="28"
          alt="law" style="opacity: 1;">
      <span class="badge-text align-middle">
          ${content}
      </span>
  </div>

  <button data-tagotion-value="${value}"  class="remove-tag btn btn-sm" type="button">
      <i class="fas fa-times-circle text-danger"></i>
  </button>
</li>
  `;
}

function optionHTML(content, img, value) {
  return `
  <option value="${value}" data-tagimg="${img}">
 ${content}
  </option>`;
}
