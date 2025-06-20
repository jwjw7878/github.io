// 페이지 로딩 효과
let subTitle = $(".sub-title");
let txt = subTitle.text();

//  개별 텍스트 애니메이션 함수
function divideText(text) {
  let html = "";
  for (let i = 0; i < text.length; i++) {
    let ch = text[i] === " " ? "&nbsp;" : text[i]; // 공백 적용
    html += `<span>${ch}</span>`;
  }
  return html;
}
divideText(txt);
subTitle.html(divideText(txt));
function wordAni() {
  $(".title-area .main-title").hide();
  $(".title-area .main-title").fadeIn(3000);
  $(".sub-title span").each(function (i) {
    $(this)
      .delay(i * 100)
      .animate({ top: 0 }, 500);
  });
  $(".page-load")
    .delay(4000)
    .animate({ top: "-100%", opacity: 0 }, 2000, function () {
      $(this).css("display", "none");
      wordAni2();
    });
}
wordAni();

//로고 클릭 시 홈 이동
$(".logo, .bottom-logo").on("click", function () {
  location.reload();
});

// section1 text 애니메이션
let txt2 = $(".section1 h1").text();
function wordAni2() {
  if ($(".page-load").is(":hidden")) {
    let html = divideText(txt2);
    $(".section1 h1").html(html);
    $(".section1 h1").css({ opacity: 1 });
    $(".section1 h1 span")
      .stop(true, true)
      .each(function (i) {
        $(this)
          .delay(i * 100)
          .animate({ top: 0, opacity: 1 }, 500);
      });
  }
}
wordAni2();

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        entry.target.classList.remove("disappear");
      } else {
        entry.target.classList.remove("appear");
        entry.target.classList.add("disappear");
      }
      if (entry.isIntersecting && entry.target.classList.contains("section2")) {
        entry.target.classList.add("appear2");
        entry.target.classList.remove("disappear2");
      } else {
        entry.target.classList.remove("appear2");
        entry.target.classList.add("disappear2");
      }
      if (entry.isIntersecting && entry.target.classList.contains("section3")) {
        entry.target.classList.add("appear3");
        entry.target.classList.remove("disappear3");
      } else {
        entry.target.classList.remove("appear3");
        entry.target.classList.add("disappear3");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// 03 project list 도형 rotate
$(function () {
  const $boxes = $(".rotate-box");
  const baseAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  let currentAngle = 0;
  let active = false;

  function updateBoxes() {
    $boxes.each(function (index) {
      const totalAngle = (baseAngles[index] + currentAngle) % 360;
      $(this).css("transform", `rotate(${totalAngle}deg) translateX(200px)`);

      if (totalAngle === 0) {
        $(this).css({ opacity: 1, zIndex: 10 });
      } else if (totalAngle === 45 || totalAngle === 315) {
        $(this).css({ opacity: 0.3, zIndex: 0 });
      } else {
        $(this).css({ opacity: 0, zIndex: 0 });
      }
    });
  }

  // section4 영역에 들어왔는지 감지
  $(window).on("scroll", function () {
    const sectionTop = $(".section4").offset().top;
    const sectionHeight = $(".section4").outerHeight();
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    active =
      scrollTop + windowHeight > sectionTop &&
      scrollTop < sectionTop + sectionHeight;
  });

  // 방향키 이벤트
  $(document).on("keydown", function (e) {
    if (!active) return;

    if (e.key === "ArrowRight") {
      currentAngle = (currentAngle + 45) % 360;
      updateBoxes();
    } else if (e.key === "ArrowLeft") {
      currentAngle = (currentAngle - 45 + 360) % 360;
      updateBoxes();
    }
  });

  updateBoxes(); // 초기 세팅
});

// 텍스트 setInterval로 깜박이는 효과

let cnt = 0;
const $text = $(".text-interval");
function textInterval() {
  cnt++;
  if (cnt % 2 == 1) {
    $text.addClass("active");
  } else {
    $text.removeClass("active");
  }
}
setInterval(textInterval, 1000);
