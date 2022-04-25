/* 
  - Global Const Variabls
  - Global Let Variabls
  - Main Navbar
  - Home Page
  - Order New Consultation
*/

$(function () {
  // Global Const Variabls
  const siteLanguage = $("body").css("direction");
  const loader = $(".loading-wrap");
  const localizationSettingsMenu = $("#main-header .localization-settings");
  const offcanvasBody = $("#main-header .offcanvas .offcanvas-body");
  const tourguideWrap = $(".tourguide-wrap");
  const imgPreviewWrap = $(".img-upload-wrap");
  const filesUploadWrap = $(".fileupload-wrap");

  // Home Vars
  const videoWrapCarousel = $(".video-carousel");
  const videoModal = $("#benefitmodalvid");
  const serviceBox = $(".card-anm");

  // Order New Consultation
  const orderNewConSumbitButton = $(".to-successpage");

  // Provider Profile
  const navpillCarousel = $(".navpills-carousel");
  const addNewDateBTN = $(".addnew-appointment-btn");

  // Edit profile page
  const readonlyInputs = $(".readonly-input");
  const commentsCarousel = $(".comments-carousel");
  const tagsForm = $(".tags-form");

  // My orders page
  const orderNavpills = $(".orderspills-carousel");

  // Contact Us page
  const messageTitleSelect = $("#messageTitleSelectID");
  // Choose Login Type
  const selectLoginTypeButtons = $(".selectlogin-button");
  // Enable Tootips Bootstrap
  const tooltipTriggerList = [
    ...document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  ];
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      template:
        '<div class="tooltip opacity-100" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner shadow rounded-pill py-2 px-6 bg-secondary-dark"></div></div>',
      offset: [0, 8],
    });
  });

  /* 
    - Global Reused
    1 -- Handle Loading page
    2 -- Handle Tourguide
    3 -- Init global plugins
  */

  // 1 -- Handle Loading page
  loader.slideUp(200, function () {
    $(this).remove();
  });
  // 2 -- Handle Tourguide
  if (tourguideWrap.length) {
    const tourguideDataAttr = $("[data-tourguide]");
    const tourguideButton = tourguideWrap.find(".tourguide-button");
    const tourguideHuman = tourguideWrap.find(".whole-human");
    const tourguideMessageWrap = tourguideWrap.find(".tourguide-message");
    const tourguideMessage = tourguideWrap.find(
      ".tourguide-message .message-text"
    );
    const tourguideActions = tourguideWrap.find(
      ".tourguide-message .tourguide-actions"
    );
    const closeBTN = tourguideActions.find(".close");

    // Get Path of assets
    const pathStyles = $("head").find('link[rel="stylesheet"]').attr("href");
    const assetsPath = pathStyles.slice(0, pathStyles.indexOf("/css/") + 1);

    const welcomeSound = new Audio(
      `${assetsPath}assets/audios/tourguide-welcome-sound.mp3`
    );

    let counter = 0;
    let isPlaying = true;

    // remove human
    tourguideHuman.slideUp(1);
    // Init tourguide
    setTimeout(() => {
      // Check if this message didnt show yet
      if (!tourguideMessageWrap.hasClass("show")) {
        welcomeSound.play();
        tourguideMessageWrap.addClass("show");
      }
    }, 3000);
    // When user click
    if (tourguideButton.length) {
      tourguideButton.click(function () {
        // Hide the init button
        tourguideButton.slideUp(200, function () {
          // if tourguide hide => show him
          welcomeSound.play();
          tourguideHuman.slideDown(200, () => {
            // if init message didnt fire yet , remove it
            !tourguideMessageWrap.hasClass("show") &&
              tourguideMessageWrap.addClass("show");
            // enable click on message wrap
            tourguideMessageWrap.removeClass("pointer-event-none");
            // show actions
            tourguideActions.slideDown(200);
          });
        });
      });

      // if user click "close tourguide"
      closeBTN.click(function () {
        if (isPlaying) {
          isPlaying = false;
        }
        tourguideMessageWrap.removeClass("show");
        tourguideMessageWrap.addClass("pointer-event-none");
        tourguideHuman.delay(250).slideUp(200, () => {
          // show init button
          tourguideButton.slideDown(200);
        });
      });

      // When click start
      tourguideActions.find(".start").click(function () {
        let that = $(this);
        let messageContent = tourguideMessage.find(".simplebar-content");
        if (tourguideDataAttr.length) {
          isPlaying = true;
          messageContent.text(
            siteLanguage === "rtl"
              ? "المساعد يعمل الان..."
              : "Is Playing Now..."
          );
          $(this).hide();

          playAudio();
        } else {
          messageContent.text(
            siteLanguage === "rtl"
              ? "لايوجد محتوى للشرح الان..."
              : "Sorry, No content to clear now..."
          );
        }

        function playAudio() {
          if (counter < tourguideDataAttr.length && isPlaying) {
            let element = tourguideDataAttr[counter];
            let audio = new Audio(JSON.parse(element.dataset.tourguide).audio);

            $("body , html").animate({
              scrollTop: $(element).offset().top - 20,
            });

            setTimeout(() => {
              $(element).addClass("current");

              audio.play();
            }, 1000);

            closeBTN.click(function () {
              audio.pause();
              $(element).removeClass("current");
              that.show();

              messageContent.text(
                siteLanguage === "rtl"
                  ? "تم اغلاق المساعد..."
                  : "Assistant is closed..."
              );
            });

            audio.onended = () => {
              $(element).removeClass("current");
              counter++;
              setTimeout(playAudio, 1500);
            };
          } else {
            isPlaying = false;
            that.show();
            counter = 0;

            messageContent.text(
              siteLanguage === "rtl" ? "تم الانتهاء!" : "Finished!"
            );
          }
        }
      });
    }
  }

  // 3 -- Init global plugins
  // 3.1 -- AOS plugin (Scroll Animation)
  //
  AOS.init({
    mirror: true,
  });
  // 3.2 -- Lazy loading
  if ($(".lazy").length) {
    $(".lazy").Lazy({
      defaultImage: "../../assets/img/lazyloader.svg",
    });
  }

  // 3.3 -- Calender Date
  if ($(".reservatoinData").length) {
    $(".reservatoinData").flatpickr({
      inline: true,
      minDate: "today",
      maxDate: new Date(new Date().getFullYear() + 1, 0, 0), // MAx date is this year
      monthSelectorType: "static",
      altInput: true,
      altInputClass: "d-none",
      clickOpens: true,
      defaultDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      locale: {
        firstDayOfWeek: 6,
        weekdays: {
          shorthand: ["S", "M", "T", "W", "T", "F", "S"],
        },
      },
    });
  }

  // 3.4 -- Img Upload View
  if (imgPreviewWrap.length) {
    imgPreviewWrap.each(function () {
      let [imgPreview, imgActions, imgInput] = [
        $(this).find(".img-upload-preview"),
        $(this).find(".img-upload-actions"),
        $(this).find(".img-upload-input"),
      ];
      $(this).imgPreview({
        imgPreview,
        imgActions,
        imgInput,
      });
    });
  }

  // 3.5 -- Files upload
  if (filesUploadWrap.length) {
    filesUploadWrap.each(function () {
      const input = $(this).find(".uploadinput");
      const altInput = $(this).find(".customed-uploadinput");

      // On click on alt input , direct click to original input
      altInput.click(() => input.click());

      // Handle input change
      input.change(function ({ target }) {
        let { files } = target;

        // If user select file
        if (files && files.length) {
          let { name } = files[0];
          let textTag = altInput.find(".text");

          // Change text to Filename text
          textTag.addClass("text-black");
          textTag.text(name);
        }
      });
    });
  }

  // 3.6 -- Star Rating
  if ($(".rating-stars").length) {
    $(".rating-stars .stars").rating(".stars");
  }

  // 3.7 -- Notify alerts

  if ($(".accept-btn").length || $(".reject-btn").length) {
    toastr.options = {
      positionClass: "toast-top-full-width",
      rtl: siteLanguage === "rtl" ? true : false,
    };

    $(".accept-btn").click(function () {
      toastr.options.toastClass = "toast bg-success shadow opacity-100";
      if (siteLanguage === "rtl") {
        toastr.success("تم القبول بنجاح");
      } else {
        toastr.success("Accepted Done!");
      }
    });

    $(".reject-btn").click(function () {
      toastr.options.toastClass = "toast bg-danger shadow opacity-100";
      if (siteLanguage === "rtl") {
        toastr.success("تم الرفض بنجاح");
      } else {
        toastr.success("Rejected Done!");
      }
    });
  }
  // In Mobile Screen and tablets
  handleNavbarResponsive();
  $(window).on("resize", () => {
    handleNavbarResponsive();
    handleServiceHeight();
  });

  /* 
  - Home Page
  1 -- Handle videos carousel (Howtobenefit section)
  2 -- handle video modal actions
  3 -- handle services height
  */

  // (Home) 1 -- Handle videos carousel (Howtobenefit section)
  if (videoWrapCarousel.length) {
    videoWrapCarousel.owlCarousel({
      items: 3,
      rtl: siteLanguage === "rtl" ? true : false,
      margin: 30,
      stagePadding: 15,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
      },
      navText: [
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="19.111" ${
          siteLanguage === "ltr" && "style='transform: rotate(180deg);'"
        } height="34.4" viewBox="0 0 19.111 34.4">
        <path id="Path_81321" data-name="Path 81321" d="M226.9,124.411a1.805,1.805,0,0,0-1.911-1.911,1.735,1.735,0,0,0-1.338.573L209.7,137.024l-13.951-13.951a1.892,1.892,0,0,0-2.676,2.676l15.289,15.289a1.848,1.848,0,0,0,2.676,0l15.289-15.289A1.735,1.735,0,0,0,226.9,124.411Z" transform="translate(-122.5 226.9) rotate(-90)" fill="#fff"/>
        </svg>      
        `,
        `
        <svg xmlns="http://www.w3.org/2000/svg" ${
          siteLanguage === "ltr" && "style='transform: rotate(180deg);'"
        } width="19.111" height="34.4" viewBox="0 0 19.111 34.4">
        <path id="Path_81320" data-name="Path 81320" d="M226.9,124.411a1.805,1.805,0,0,0-1.911-1.911,1.735,1.735,0,0,0-1.338.573L209.7,137.024l-13.951-13.951a1.892,1.892,0,0,0-2.676,2.676l15.289,15.289a1.848,1.848,0,0,0,2.676,0l15.289-15.289A1.735,1.735,0,0,0,226.9,124.411Z" transform="translate(141.611 -192.5) rotate(90)" fill="#fff"/>
        </svg>      
        `,
      ],
      dots: false,
      onInitialized: counterSlider,
      onTranslated: counterSlider,
    });

    function counterSlider(e) {
      let pageSize = e.item.count;
      let currentItem = e.item.index + 1;
      let owlNav = $(".owl-nav");
      $(".owl-dots").remove();

      owlNav.prependTo(".owl-carousel");
      owlNav.attr("data-aos-once", "true");
      owlNav.attr("data-aos", "fade-up");
      owlNav.addClass("text-end px-4 mb-6");
      owlNav.find(".owl-counter").length &&
        owlNav.find(".owl-counter").remove();
      owlNav.find(".owl-prev").after(`
        <span class="text-white owl-counter px-2 d-inline-block display-xomd align-middle">
          ${currentItem} / ${pageSize}
        </span>
      `);
    }
  }

  // (Home) 2 -- handle video modal actions
  if (videoModal.length) {
    videoModal.on("show.bs.modal", function () {
      // stop video when close modal
      let content = videoModal.find(".content");

      content.html(
        `<video controls width="100%" height="100%" src="../../assets/videos/howtobenefit.mp4"></video>`
      );
    });

    videoModal.on("hidden.bs.modal", function () {
      // stop video when close modal
      videoModal.find(".content").html("");
    });
  }

  // (Home) 2 -- handle services height
  handleServiceHeight();

  /* 
    - Order New Consultation Page
    1 - Handle Sumbit to redirect user
  */
  // (Order New Cons)  1 - Handle Sumbit to redirect user
  if (orderNewConSumbitButton.length) {
    let filesName = [
      "new-consultation",
      "instant-consultation",
      "order-consultation",
    ]; // This filesname var will redirect to success when user submit
    orderNewConSumbitButton.click(function (e) {
      filesName.forEach((name) => {
        if (location.href.includes(`${name.trim()}.html`)) {
          e.preventDefault();
          let redirectURL = location.href.replace(
            `${name.trim()}.html`,
            "success-sent.html"
          );
          // redirect to success page
          location.assign(redirectURL);
        } else {
          return true;
        }
      });
    });
  }

  /* 
    - Service provider Profile
    1 - Handle Nav pills carousel
    2 - show add new date when date nap button active
  */
  // 1 - Handle Nav pills carousel
  if (navpillCarousel.length) {
    // Default hide addnewdate button
    addNewDateBTN.hide(1);

    navpillCarousel.owlCarousel({
      autoWidth: true,
      rtl: siteLanguage === "rtl" ? true : false,
      margin: 30,
      dots: false,
    });

    toggleActivePills(navpillCarousel, function (button) {
      if (button.hasClass("mydates")) {
        addNewDateBTN.show(100);
      } else {
        addNewDateBTN.hide(100);
      }
    });
  }

  // My orders page carousel
  if (orderNavpills.length) {
    orderNavpills.owlCarousel({
      items: 3,
      rtl: siteLanguage === "rtl" ? true : false,
      margin: 30,
      dots: false,
      nav: false,
      responsive: {
        0: {
          autoWidth: true,
          startPosition: 1,
          center: true,
          loop: true,
        },
        992: {
          loop: false,
          startPosition: 0,
          center: false,
          autoWidth: false,
          items: 3,
        },
      },
    });
    toggleActivePills(orderNavpills);
  }
  /* 
    - Edit Profile Page
    1 - When click on edit button
    2 - Comments Carousel
    3 - handle tags
  */

  //  1 - When click on edit button
  if (readonlyInputs.length) {
    readonlyInputs.each(function () {
      const that = $(this);
      const editBTN = that.find(".editinput img");

      editBTN.click(function () {
        const input = that.find("input,textarea");
        const inputVAL = input.val();
        const thisBTN = $(this);
        input.attr("readonly", false);
        input[0].select();

        input.focus();
        that.addClass("bg-paper");

        thisBTN.hide(200, function () {
          that
            .find(".editinput")
            .append(
              `<i class="fas fa-times text-danger fs-1 align-text-top remove-newvalue"></i>`
            );

          // When remove the new edit value
          $(".remove-newvalue").click(function () {
            input.attr("readonly", true);
            input.blur();
            that.removeClass("bg-paper");
            input.val(inputVAL);
            $(this).hide(200, function () {
              $(this).remove();

              editBTN.show(200);
            });
          });
        });
      });
    });
  }

  //  2 - Comments Carousel
  if (commentsCarousel.length) {
    commentsCarousel.owlCarousel({
      items: 1,
      nav: true,
      dots: false,
      rtl: siteLanguage === "rtl" ? true : false,
      margin: 30,
      navText: [
        `
        <i class="fas  fa-chevron-${
          siteLanguage === "rtl" ? "right" : "left"
        } fs-3 text-black-50"></i>     
        `,
        `
        <i class="fas  fa-chevron-${
          siteLanguage === "rtl" ? "left" : "right"
        } fs-3 text-black-50"></i>    
        `,
      ],

      onInitialized: changeNavPlace,
    });

    function changeNavPlace() {
      let owlNav = $(".owl-nav");
      let navigationText = $(".navigations-rating-list .text");
      if (owlNav.length) {
        let prev = owlNav.find(".owl-prev").addClass("btn");
        let next = owlNav.find(".owl-next").addClass("btn");
        navigationText.before(prev);
        navigationText.after(next);
      }
    }
  }

  //  3 - handle tags
  if (tagsForm.length) {
    const tagsList = $(".tags-list");

    tagsForm.tags({
      tagsList,
    });
  }

  /* 
    - Handle Choose Login Type Links
  */
  if (selectLoginTypeButtons.length) {
    selectLoginTypeButtons.each(function () {
      // Set default link to default active button
      if ($(this).hasClass("active")) {
        $(this).wrap(`<a href="${$(this).data("logintype-link")}"></a>`);
      }

      $(this).click(function () {
        let link = $(this).data("logintype-link");
        // if parent is Link in sibling , remove this link only without inner
        if ($(this).siblings().is("a")) {
          $(this).siblings().find(".selectlogin-button").unwrap();
        }

        // Toggle active link
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        // Wrap this element by Link
        $(this).wrap(`<a href="${link}"></a>`);
      });
    });
  }

  /*
    - Contact Us page 
    1 -- handle when select other...
  */

  if (messageTitleSelect.length) {
    messageTitleSelect.on("change", function (e) {
      let val = $(this).val();

      if (val === "other") {
        $(this)
          .after(`<input type="text" name="messageTitle" id="messageTitleTextID"
        class="form-control text-black display-omd py-3 mt-3" placeholder="${
          siteLanguage === "rtl" ? "عنوان الرسالة" : "Message Title"
        }">`);
      } else {
        $("#messageTitleTextID").length &&
          $("#messageTitleTextID").slideUp(200, function () {
            $(this).remove();
          });
      }
    });
  }

  // Global or Reused Functions
  function handleNavbarResponsive() {
    if (window.innerWidth <= 768) {
      // Move localization settings menu to the offcanvas
      localizationSettingsMenu.appendTo(offcanvasBody);
      localizationSettingsMenu.addClass("justify-content-between mt-3");
    }
  }

  function handleServiceHeight() {
    if (serviceBox.length) {
      let serviceBoxHeight = 0;
      serviceBox.find(".service-card.back .card-body").each(function () {
        if ($(this).innerHeight() > serviceBoxHeight) {
          serviceBoxHeight = $(this).innerHeight();
        }
      });

      serviceBox.height(serviceBoxHeight + "px");
    }
  }

  function toggleActivePills(navpillCarousel, fn = null) {
    navpillCarousel.find(".nav-link").click(function () {
      if (fn) {
        fn($(this));
      }
      $(this).addClass("active");
      $(this)
        .parent()
        .parent()
        .siblings()
        .find(".nav-link")
        .removeClass("active");
    });
  }
});
