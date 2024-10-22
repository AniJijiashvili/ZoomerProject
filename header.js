const popupOpenBtn = document.getElementsByClassName("cart_container")[0];
const popupCloseBtn = document.getElementById("close_tbn");
const popupContainer = document.getElementById("popup_container");
const overlay = document.getElementById("overlay");
const popupContainerBox = document.getElementById("popup");
const openCartButton = document.getElementById("open_cart");
const openCountyOptions = document.getElementById("number_input--index");
const countyContainer = document.getElementById("country_list--container");
const selectedCounty = document.getElementById("deal_index");
const languageContainer = document.getElementById("laguage");
const languageOptions = document.getElementById("laguage_option");
const redBottom = document.getElementById("red_before");
const autorizationContainer = document.getElementById(
  "authorization_container"
);

// ==========================================

// handle header scroll==========
window.addEventListener("scroll", () => {
  const headerBar = document.querySelector("header");
  const navigation = document.getElementById("header__details");

  if (window.innerWidth > 1023) {
    if (window.scrollY > 120) {
      headerBar.classList.add("active");
      navigation.style.display = "none";
    } else {
      headerBar.classList.remove("active");
      navigation.style.display = "flex";
    }
  }
});

// Open/close popup =============
function handlePopupOpen() {
  popupContainer.classList.add("open");
  popupContainerBox.classList.add("active");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  overlay.addEventListener("click", () => {
    handlePopupClose();
  });
  handleDropdownCountries();
  handleAutorization();
  // handlePopupContent();
}

function handlePopupClose() {
  popupContainer.classList.remove("open");
  countyContainer.classList.remove("active");
  popupContainerBox.classList.remove("active");
  document.body.style.overflow = "";
  overlay.style.display = "none";
}

// // handleAutorization

function handleAutorization() {
  const radioButton = document.getElementById("radio_rules--container");
  const mailBox = document.getElementById("mail_box");
  const numberBox = document.getElementById("number_box");
  const indexContainer = document.getElementById("number_input--index");
  const inputContainer = document.getElementById("number_input--container");
  const popupInputs = document.getElementById("popup_inputs");

  redBottom.style.left = "0px";
  redBottom.style.right = "200px";
  autorizationContainer.style.display = "flex";
  countyContainer.classList.remove("active");
  radioButton.style.display = "none";

  let handleAutorizationType = () => {
    mailBox.addEventListener("click", () => {
      mailBox.classList.add("active");
      numberBox.classList.remove("active");

      indexContainer.style.display = "none";
      inputContainer.style.display = "flex";
      inputContainer.style.flexDirection = "column";

      popupInputs.innerHTML = `
      <div class="number_input-field">
                  <input
                    class="popup_input"
                    id="mail_input"
                    type="password"
                    placeholder=" "
                  />
                  <label for="">ელფოსტა</label>
                </div>
                <div class="number_input-field">
                  <input
                    class="popup_input"
                    id="email_input"
                    type="password"
                    placeholder=" "
                  />
                  <label for="">პაროლი</label>
                  <img
                    src="./assets/header/hiddenPassword.svg"
                    alt="passwrd_hide"
                    id="password_hide"
                  />
                </div>
      `;

      const handleShowPassword = () => {
        const hideImg = document.getElementById("password_hide");
        hideImg.addEventListener("click", () => {
          hideImg.src = "./assets/header/showPassword.svg";
        });
      };
    });

    numberBox.addEventListener("click", () => {
      numberBox.classList.add("active");
      mailBox.classList.remove("active");
      indexContainer.style.display = "flex";
      inputContainer.style.display = "grid";

      popupInputs.innerHTML = `
      <div class="number_input-field">
      <input  class="popup_input" id="number_input" type="text" placeholder=" " />
      <label for="">ტელეფონის ნომერი</label>
    </div>
      `;
    });
  };

  handleAutorizationType();
}

// // registration field

function handleRegistration() {
  const radioButton = document.getElementById("radio_rules--container");
  const popupBtn = document.getElementById("popup_btn");
  countyContainer.classList.remove("active");

  redBottom.style.left = "200px";
  autorizationContainer.style.display = "none";
  popupBtn.textContent = "რეგისტრაცია";

  radioButton.style.display = "flex";
  radioButton.innerHTML = `
<img id="radio_btn" src="./assets/header/frame.png" alt="" />
<p class="radio_rules">
  წავიკითხე და ვეთანხმები
  <a target="_blank" href="/info/terms-and-conditions">
    წესებს, პირობებს და პერსონალურ მონაცემთა დაცვის პოლიტიკას</a
  >
</p>`;
}

// radio button cklicked
let clicked = false;

function handleTickRules() {
  const radioBtn = document.getElementById("radio_btn");
  clicked = !clicked;
  if (clicked) {
    radioBtn.src = "./assets/header/checked-rules.svg";
  } else {
    radioBtn.src = "./assets/header/frame.png";
  }
}

// Countries in popup============

// fetch Country data

async function fetchData() {
  const url = "https://restcountries.com/v3.1/all";
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let datas = await response.json();
    return datas;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// display Language========
async function displayLanguageCountry() {
  const selectedLanguageFlag = document.getElementById("flag");
  const uk = document.getElementById("uk");
  const geo = document.getElementById("geo");

  let data = await fetchData();

  const georgia = data.find((country) => country.name.common === "Georgia");
  const england = data.find(
    (country) => country.name.common === "United Kingdom"
  );

  uk.addEventListener("click", () => {
    selectedLanguageFlag.src = england.flags.png;
  });
  geo.addEventListener("click", () => {
    selectedLanguageFlag.src = georgia.flags.png;
  });
}

// dropdown Country ============================
async function handleDropdownCountries() {
  const countriesList = document.getElementById("country_list");
  const flag = document.getElementById("selected_flag");
  const searchValue = document.getElementById("search_county");

  countriesList.innerHTML = "";

  let countryData = await fetchData();

  // Create an array to store country options
  const countryOptions = countryData.map((newCountryData) => {
    let countryOption = document.createElement("li");
    countryOption.classList.add("country_list--item");

    let flags = document.createElement("img");
    flags.src = newCountryData.flags.png;
    flags.alt = `Flag of ${newCountryData.name.common}`;
    flags.classList.add("county_flag");

    let countryName = document.createElement("span");
    countryName.classList.add("county_name");
    countryName.textContent = newCountryData.name.common;

    let countryPhone = document.createElement("span");
    countryPhone.classList.add("country_phone");
    countryPhone.textContent =
      newCountryData.idd.root + newCountryData.idd.suffixes;

    // Append the elements
    countryOption.appendChild(flags);
    countryOption.appendChild(countryName);
    countryOption.appendChild(countryPhone);

    //  select country
    countryOption.addEventListener("click", () => {
      flag.src = newCountryData.flags.png;
      selectedCounty.textContent = countryPhone.textContent;
      countyContainer.classList.remove("active");
      searchValue.value = "";
      handleDropdownCountries();
    });
    countriesList.appendChild(countryOption);

    return { countryOption, countryName };
  });

  // search input value
  searchValue.addEventListener("keyup", () => {
    const searchTerm = searchValue.value.toLowerCase();

    countryOptions.forEach(({ countryOption, countryName }) => {
      if (countryName.textContent.toLowerCase().includes(searchTerm)) {
        countryOption.style.display = "flex";
      } else {
        countryOption.style.display = "none";
      }
    });
  });
}

// display county option in container

function displayCountryOptions() {
  countyContainer.classList.toggle("active");
}

// change language =========

function handleChangeLaguage() {
  languageOptions.classList.toggle("active");
}

// empty cart ==========

let handleOpenCart = () => {
  try {
    window.open("cart.html", "_blank");
  } catch (error) {
    console.error("Failed to open cart:", error);
  }
};

// search bar================================

// fetch data for searchBar
async function searchData() {
  try {
    const response = await fetch("./products.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const searchDataAll = await response.json();
    return searchDataAll;
  } catch (err) {
    console.error("Error fetching search data:", err);
  }
}

async function displaySearchValue() {
  searchData();

  const searchInput = document.getElementById("search_input");
  const data = await searchData();

  // Create search result container

  searchInput.addEventListener("keyup", async () => {
    const searchValue = searchInput.value.toLowerCase();
    const inputForm = document.getElementById("search_conteiner");

    if (searchValue.length > 0) {
      const overlaySearch = document.getElementById("search_result--overlay");
      overlaySearch.classList.add("active");
      const searchResult = document.createElement("div");
      searchResult.classList.add("search_result");

      const searchResultTitle = document.createElement("div");
      searchResultTitle.classList.add("search_result--title");

      const filterCategory = document.createElement("div");
      filterCategory.textContent = "გაფილტრე კატეგორია";

      const categoryAnchor = document.createElement("a");
      categoryAnchor.href = "./navigation.html";

      const allCategory = document.createElement("div");
      allCategory.textContent = "ყველას ნახვა";
      allCategory.classList.add("category");

      // Append elements
      categoryAnchor.appendChild(allCategory);
      searchResultTitle.appendChild(filterCategory);
      searchResultTitle.appendChild(categoryAnchor);
      searchResult.appendChild(searchResultTitle);
      inputForm.appendChild(searchResult);

      document.addEventListener("click", (event) => {
        if (
          searchResult &&
          !inputForm.contains(event.target) &&
          event.target !== searchInput
        ) {
          searchResult.remove();
          overlaySearch.classList.remove("active");
          searchValue = "";
        }
      });

      const results = [];

      for (const key in data) {
        data[key].forEach((item) => {
          if (item.name.toLowerCase().includes(searchValue)) {
            results.push(item);
          }
        });
      }

      if (results.length > 0) {
        results.forEach((item) => {
          const resultDetails = document.createElement("div");
          resultDetails.classList.add("search_result--details");

          const resultDetailsContainer = document.createElement("div");
          resultDetailsContainer.classList.add("search_details--container");

          const resultImg = document.createElement("img");
          resultImg.classList.add("result_img");
          resultImg.src = item.imageUrl;

          const resultDetailsContent = document.createElement("div");
          resultDetailsContent.classList.add("search_details--content");

          const resultDetailsTitle = document.createElement("div");
          resultDetailsTitle.classList.add("search_details--title");
          resultDetailsTitle.textContent = item.name;

          const resultDetailsPrice = document.createElement("div");
          resultDetailsPrice.classList.add("search_details--price");

          const prevPrice = document.createElement("span");
          prevPrice.classList.add("previous-price");

          if (item.previousPrice) {
            resultDetailsPrice.textContent = `${item.price} ₾`;
            resultDetailsPrice.style.color = "var(--orange-main)";
            prevPrice.textContent = `${item.previousPrice} ₾ prev`;
            resultDetailsPrice.appendChild(prevPrice);
          } else {
            resultDetailsPrice.textContent = `${item.price} ₾`;
          }

          resultDetailsContent.appendChild(resultDetailsTitle);
          resultDetailsContent.appendChild(resultDetailsPrice);
          resultDetailsContainer.appendChild(resultImg);
          resultDetailsContainer.appendChild(resultDetailsContent);
          resultDetails.appendChild(resultDetailsContainer);
          searchResult.appendChild(resultDetails);
        });
      }
    } else {
    }
  });
}

// aside slider

function handleAsideSlider() {
  const asideSliderContainer = document.getElementById("aside_slider");
  const search_conteiner = document.getElementById("#search_conteiner");

  if (asideSliderContainer.style.display === "flex") {
    asideSliderContainer.style.display = "none";
    search_conteiner.style.display = "flex";
    asideSliderContainer.style.transform = "translateX(0%)";
    asideSliderContainer.innerHTML = `
    <div class="aside_slider--input">
        <form action="" id="search_conteiner slider-input">
          <img src="./assets/header/main-search.svg" alt="search-logo" />
          <input
            id="search_input"
            type="text"
            placeholder="ძიება"
            onclick="displaySearchValue()"
          />
          <img src="./assets/header/searchLoop.svg" alt="loop" />
        </form>
      </div>`;
  } else {
    asideSliderContainer.style.display = "flex";
    asideSliderContainer.style.transform = "translateX(-100%)";

    setTimeout(() => {
      asideSliderContainer.style.transition = "transform 0.3s ease";
      asideSliderContainer.style.transform = "translateX(0%)";
    }, 10);
  }
}
