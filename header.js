const popupOpenBtn = document.getElementsByClassName("cart_container")[0];
const popupCloseBtn = document.getElementById("close_tbn");
const popupContainer = document.getElementById("popup_container");
const overlay = document.getElementById("overlay");
const popupContainerBox = document.getElementById("popup");
const openCartButton = document.getElementById("open_cart");
const openCountyOptions = document.getElementsByClassName(
  "number_input--index"
)[0];
const countyContainer = document.getElementById("country_list--container");
const selectedCounty = document.getElementById("deal_index");
const languageContainer = document.getElementById("laguage");
const languageOptions = document.getElementById("laguage_option");
const redBottom = document.getElementById("red_before");
const autorizationContainer = document.getElementById(
  "authorization_container"
);


window.addEventListener("scroll", () => {
  const headerBar = document.querySelector("header");
  const navigation = document.getElementById("header__details");

  if (window.scrollY > 110) {
    headerBar.classList.add("active");
    navigation.style.display = "none";
  } else {
    headerBar.classList.remove("active");
    navigation.style.display = "flex";
  }
});


function handlePopupOpen() {
  popupContainer.classList.add("open");
  popupContainerBox.classList.add("active");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  overlay.addEventListener("click", () => {
    handlePopupClose();
  });
  handleDropdownCountries();
  // handlePopupContent();
}

function handlePopupClose() {
  popupContainer.classList.remove("open");
  countyContainer.classList.remove("active");
  popupContainerBox.classList.remove("active");
  document.body.style.overflow = "";
  overlay.style.display = "none";
}


function handleAutorization() {
  redBottom.style.left = "0px";
  redBottom.style.right = "200px";
  autorizationContainer.style.display = "flex";
  const radioButton = document.getElementById("radio_rules--container");

  radioButton.style.display = "none";
}


function handleRegistration() {
  const radioButton = document.getElementById("radio_rules--container");
  const popupBtn = document.getElementById("popup_btn");

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

async function handleDropdownCountries() {
  const countriesList = document.getElementById("country_list");
  const flag = document.getElementById("selected_flag");
  const searchValue = document.getElementById("search_county");

  countriesList.innerHTML = "";

  let countryData = await fetchData();

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

    countryOption.appendChild(flags);
    countryOption.appendChild(countryName);
    countryOption.appendChild(countryPhone);

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


function displayCountryOptions() {
  countyContainer.classList.toggle("active");
}


function handleChangeLaguage() {
  languageOptions.classList.toggle("active");
}


let handleOpenCart = () => {
  try {
    window.open("cart.html", "_blank");
  } catch (error) {
    console.error("Failed to open cart:", error);
  }
};


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


  searchInput.addEventListener("keyup", async () => {
    const searchValue = searchInput.value.toLowerCase();
    const inputForm = document.getElementById("search_conteiner");
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
        resultDetailsPrice.textContent = `${item.price}  ₾`;

        resultDetailsContent.appendChild(resultDetailsTitle);
        resultDetailsContent.appendChild(resultDetailsPrice);
        resultDetailsContainer.appendChild(resultImg);
        resultDetailsContainer.appendChild(resultDetailsContent);
        resultDetails.appendChild(resultDetailsContainer);
        searchResult.appendChild(resultDetails);

        if (searchValue == "") {
          resultDetails.innerHTML = "";
        }
      });
    }
  });
}
