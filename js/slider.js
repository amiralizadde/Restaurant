let menuSlider = new Swiper(".menu-slider-Swiper", {
    loop: true,
    slidesPerView: 3,
    centeredSlides: true,
    breakpoints: {
      200: {
          slidesPerView: 1
      },
      576: {
          slidesPerView: 2
      },
      1000: {
          slidesPerView: 3
      }
    },
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });