// 배너 닫기 이벤트
let banner = document.querySelector(".banner");
let closeBtn = document.querySelector(".banner i");
closeBtn.addEventListener("click", function () {
  banner.style.display = "none";
  nav.style.top = "0px";
});
// 할인 팝업 닫기 이벤트
let discountPopup = document.querySelector(".discount-popup");
let popupCloseBtn = document.querySelector(".discount-popup i");
popupCloseBtn.addEventListener("click", function () {
  discountPopup.style.display = "none";
});

// 베스트 아이템 메뉴 컬러 변경 이벤트
let bestItemsMenu = document.querySelectorAll(".best-items menu a");

bestItemsMenu.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    bestItemsMenu.forEach((el) => {
      el.classList.remove("active");
    });
    this.classList.add("active");
  });
});

//swiper
const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  centeredSlides: true,
  slidesPerView: 5,
  coverflowEffect: {
    rotate: -10,
    stretch: -120,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

const swiper2 = new Swiper(".mySwiper2", {
  centeredSlides: true,
  speed: 5000,
  autoplay: {
    delay: 0,
  },
  loop: true,
  slidesPerView: "auto",
  // disableOnInteraction: false,
});
