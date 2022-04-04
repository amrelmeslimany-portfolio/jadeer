/* 
  - Global Const Variabls
  - Global Let Variabls
  - Main Navbar
  - Home Page
*/

$(function () {
  // Global Const Variabls
  const siteLanguage = $("body").css("direction");
  const localizationSettingsMenu = $("#main-header .localization-settings");
  const offcanvasBody = $("#main-header .offcanvas .offcanvas-body");
  const tourguideWrap = $(".tourguide-wrap");

  // Home Vars
  const videoWrapCarousel = $(".video-carousel");
  const videoModal = $("#benefitmodalvid");
  const serviceBox = $(".card-anm");

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
  $(".loading-wrap").slideUp(200, function () {
    $(this).remove();
  });
  // 2 -- Handle Tourguide
  if (tourguideWrap.length) {
    const tourguideButton = tourguideWrap.find(".tourguide-button");
    const tourguideHuman = tourguideWrap.find(".whole-human");
    const tourguideMessageWrap = tourguideWrap.find(".tourguide-message");
    const tourguideMessage = tourguideWrap.find(
      ".tourguide-message .message-text"
    );
    const tourguideActions = tourguideWrap.find(
      ".tourguide-message .tourguide-actions"
    );
    const welcomeSound = new Audio(
      "../../assets/audios/tourguide-welcome-sound.mp3"
    );
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
      tourguideActions.find(".close").click(function () {
        tourguideMessageWrap.removeClass("show");
        tourguideMessageWrap.addClass("pointer-event-none");
        tourguideHuman.delay(250).slideUp(200, () => {
          // show init button
          tourguideButton.slideDown(200);
        });
      });
    }
  }

  // Init global plugins
  // AOS plugin (Scroll Animation)
  AOS.init();

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

  // 1 -- Handle videos carousel (Howtobenefit section)
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
        <svg xmlns="http://www.w3.org/2000/svg" width="19.111" height="34.4" viewBox="0 0 19.111 34.4">
        <path id="Path_81321" data-name="Path 81321" d="M226.9,124.411a1.805,1.805,0,0,0-1.911-1.911,1.735,1.735,0,0,0-1.338.573L209.7,137.024l-13.951-13.951a1.892,1.892,0,0,0-2.676,2.676l15.289,15.289a1.848,1.848,0,0,0,2.676,0l15.289-15.289A1.735,1.735,0,0,0,226.9,124.411Z" transform="translate(-122.5 226.9) rotate(-90)" fill="#fff"/>
        </svg>      
        `,
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="19.111" height="34.4" viewBox="0 0 19.111 34.4">
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

  // 2 -- handle video modal actions
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

  // 2 -- handle services height
  handleServiceHeight();

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
});
