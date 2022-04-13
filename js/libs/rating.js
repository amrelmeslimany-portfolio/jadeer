$.fn.rating = function (ulWrap) {
  /* 2. Action to perform on click */
  $(`${ulWrap}`).each(function () {
    let defaultRate = parseInt(
      $(this).find("li.selected").last().data("rate-value"),
      10
    );

    let defaultInput = $(this).parent().find(".rate-input");
    defaultInput.val(defaultRate);

    $(this)
      .find("li")
      .on("click", function () {
        let onStar = parseInt($(this).data("rate-value"), 10); // The star currently selected
        let stars = $(this).parent().children("li.star");

        for (i = 0; i < stars.length; i++) {
          $(stars[i]).removeClass("selected");
          toggleIconWeight($(stars[i]).find("i"), "fa", "far");
        }

        for (i = 0; i < onStar; i++) {
          $(stars[i]).addClass("selected");
          toggleIconWeight($(stars[i]).find("i"), "far", "fa");
        }

        // JUST RESPONSE (Not needed)
        let input = $(this).parent().parent().find(".rate-input");
        let ratingValue = parseInt(
          $(this).parent().find("li.selected").last().data("rate-value"),
          10
        );

        input.val(ratingValue);
      });
  });
};

function toggleIconWeight(element, remove, add) {
  element.removeClass(remove);
  element.addClass(add);
}
