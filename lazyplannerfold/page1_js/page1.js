// section1 시작하기 버튼 hover
$(".play-btn").hover(
  function () {
    $(".image-inner").css("transform", "rotateY(180deg)");
  },
  function () {
    $(".image-inner").css("transform", "rotateY(0deg)");
  }
);
// 모바일 메뉴
let count = 0;
$(".fa-bars").on("click", function () {
  if (count % 2 == 0) {
    $("header ul").css("height", "200px");
  } else {
    $("header ul").css("height", "0");
  }
  count++;
});
// 이미지 슬라이드 기능
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
  },
});

// 페이지 업 버튼
$(".back-top").hide();
$(window).on("scroll", function () {
  let scrollY = $(this).scrollTop();
  // console.log(scrollY);
  if (scrollY >= 250) {
    $(".back-top").show();
  } else {
    $(".back-top").hide();
  }
});

$(".back-top").on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, 500);
});

// 국가, 도시, 이미지 랜더링
const imageCardArea = document.querySelector(".image-card-area");
const popup = document.querySelector(".popup");

let thumbsCount = 0; // 좋아요 카운트
async function getCountriesData() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,flags,languages,population"
  );
  const data = await res.json();
  console.log(data);
  await renderData(data);
}
getCountriesData();

async function filterCountries() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,flags,languages,population"
  );
  const data = await res.json();
  const inputValue = document
    .querySelector("#search")
    .value.trim()
    .toLowerCase();

  if (!inputValue) {
    await getCountriesData();
    return;
  }
  imageCardArea.innerHTML = "";

  let filtered = data.filter(
    (el) =>
      el.name.common.toLowerCase().includes(inputValue) ||
      (el.capital &&
        el.capital[0] &&
        el.capital[0].toLowerCase().includes(inputValue))
  );
  console.log(filtered);

  if (filtered.length > 0) {
    await renderData(filtered);
  } else {
    imageCardArea.innerHTML = `<p class="unknown">죄송합니다 ㅠㅠ 찾으시는 국가가 있지 않습니다.<p/>`;
  }
}
async function renderData(getData) {
  for (let countries of getData) {
    // console.log(countries);
    let div = document.createElement("div");
    div.className = "card";
    let totalPopulation = countries.population.toLocaleString();
    let languages = countries.languages;
    let languageList = Object.values(languages).join(",");
    let countryImg = countries.flags.png;
    let country = countries.name.common;
    let capital = countries.capital[0];
    div.innerHTML = `<img src="${countryImg}" alt="${country}" class="image"/>
                      <p class="country">${country}</p>
                      <p class="capital">${capital}</p>
                      <i class="fa-regular fa-thumbs-up"></i>
                      `;
    imageCardArea.appendChild(div);

    div.addEventListener("click", function (e) {
      if (e.target.classList.contains("fa-thumbs-up")) {
        e.target.classList.toggle("thumbs-active");
        thumbsActive();
        if (e.target.classList.contains("thumbs-active")) {
          thumbsCount += 1;
        } else {
          thumbsCount -= 1;
        }
        console.log(thumbsCount);
        let countIcon = document.querySelector(".count-icon");
        if (thumbsCount > 0) {
          countIcon.style.display = "block";
          countIcon.textContent = thumbsCount;
        } else {
          countIcon.style.display = "none";
        }
        e.stopPropagation();
        return;
      }
      popup.classList.add("active");
      let popupImage = document.querySelector(".popup-image");
      let popupCountry = document.querySelector(".popup-country");
      let popupCapital = document.querySelector(".popup-capital");
      let popupLanguage = document.querySelector(".popup-language");
      let popupPopulation = document.querySelector(".popup-population");

      popupImage.innerHTML = `<img src="${countryImg}" alt="${country}" class="image"/>`;
      popupCountry.textContent = country;
      popupCapital.innerHTML = `<p>수도 : ${capital}`;
      popupLanguage.innerHTML = `<p>언어 : ${languageList}`;
      popupPopulation.innerHTML = `<p>총 인구수 : ${totalPopulation} 명`;
    });
  }
}

// 좋아요 클릭시 장바구니에 정보 입력
function thumbsActive() {
  let arr = [];
  let count = 0;
  const allCard = document.querySelectorAll(".card");
  allCard.forEach((card) => {
    const thumbIcon = card.querySelector(".fa-thumbs-up");
    if (thumbIcon.classList.contains("thumbs-active")) {
      let country = card.querySelector(".country").textContent;
      let countryImg = card.querySelector(".image").src;
      count++;
      let id = count;
      let obj = { getid: id, getimg: countryImg, getcountry: country };
      arr.push(obj);
    }
  });
  console.log(arr);
}

document
  .querySelector(".fa-magnifying-glass")
  .addEventListener("click", filterCountries);

document.querySelector("#search").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    filterCountries();
  }
});

document.addEventListener("click", function (e) {
  if (popup.classList.contains("active")) {
    if (popup.contains(e.target)) {
      popup.classList.remove("active");
    }
  }
});
