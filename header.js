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
const selectedLanguageFlag = document.getElementById("flag");
const languageOptions = document.getElementById("laguage_option");

// ==========================================

// handle header scroll==========
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

// Open/close popup =============
let handlePopupOpen = async () => {
  popupContainer.classList.add("open");
  popupContainerBox.classList.add("active");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  handleDropdownCountries();
};

let handlePopupClose = async () => {
  popupContainer.classList.remove("open");
  countyContainer.classList.remove("active");
  popupContainerBox.classList.remove("active");
  document.body.style.overflow = "";
  overlay.style.display = "none";
};

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

async function displayLanguageCountry() {
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

// display county data

async function handleDropdownCountries() {
  const countriesList = document.getElementById("country_list");
  const flag = document.getElementById("selected_flag");

  countriesList.innerHTML = "";

  let countryData = await fetchData();

  countryData.forEach((newCountryData) => {
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

    countriesList.appendChild(countryOption);
    countryOption.appendChild(flags);
    countryOption.appendChild(countryName);
    countryOption.appendChild(countryPhone);

    countryOption.addEventListener("click", () => {
      flag.src = newCountryData.flags.png;
      selectedCounty.textContent =
        newCountryData.idd.root + newCountryData.idd.suffixes;
    });
  });
}

// display county option container

function displayCountryOptions() {
  countyContainer.classList.toggle("active");
}

// change language =========

// display language option container
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
