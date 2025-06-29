document.addEventListener("DOMContentLoaded", function () {
  let swiper = new Swiper("#sou_main_slide .mainSwiper", {
    slidesPerView: 1,
    pagination: {
      el: ".mainSwiper .swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".sou-button-next",
      prevEl: ".sou-button-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false, // 슬라이더 정지 
      pauseOnMouseEnter: true,
    }
  });

  let swiper1 = new Swiper(".sou_school_list1 .albumSwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    pagination: {
      el: ".albumSwiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".moveBtn-next",
      prevEl: ".moveBtn-prev",
    },
    breakpoints: {
      //반응형 설정
      500: {
        slidesPerView:2,
      },
      1200: {
        slidesPerView:3,
      },
      1400: {
        slidesPerView:2,
      },
      1648: {
        slidesPerView:2,
      },
      1649: {
        slidesPerView: 3,
      },
    },
  });
  //창크기변경 실시간반영
  window.addEventListener("resize", () => {
    swiper1.update();
  })

});

