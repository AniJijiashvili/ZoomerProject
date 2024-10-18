let mobiles, headPhones, smartWatch, fitness, mobileAccessories;
let hoverSection = document.getElementsByClassName(
  "product-categories__featured--item"
);
let hoverContainer = document.getElementsByClassName(
  "product-categories__featured__items__details"
);
let popupMobileSection = document.getElementsByClassName(
  "product-categories__featured__items__details--mobiles"
);
let mainSectionSwiper = document.getElementsByClassName("swiper");
let popupTabsSection = document.getElementsByClassName(
  "product-categories__featured__items__details--tabs"
);
let mobileContainer = document.getElementsByClassName(
  "product-categories__featured__items__details--mobiles__content"
);
let popupComputerSection = document.getElementsByClassName(
  "product-categories__featured__items__details--computers"
);
let popupGadgetsSection = document.getElementsByClassName(
  "product-categories__featured__items__details--gadgets"
);
let popupBrandsSection = document.getElementsByClassName(
  "product-categories__featured__items__details--brands"
);
let popupGamingSection = document.getElementsByClassName(
  "product-categories__featured__items__details--gaming"
);
let popupTvSection = document.getElementsByClassName(
  "product-categories__featured__items__details--tv"
);
let popupPhotoSection = document.getElementsByClassName(
  "product-categories__featured__items__details--photo"
);
let mySwiper2 = document.getElementsByClassName("mySwiper2");

//ჰედერის და ფუტერის შემოტანა
document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (url, id) => {
    fetch(url)
      .then((response) => response.text())
      .then((datails) => {
        document.getElementById(id).innerHTML = datails;
      })
      .catch((error) => console.error("Error:", error));
  };

  loadComponent("header.html", "header");
  loadComponent("footer.html", "footer");
});
// ბანერების შევსება
fetch("baners.json")
  .then((response) => response.json())
  .then((baners) => {
    let banersPhoto = document.getElementsByClassName("baners__photo");
    let banersPhotoMobile = document.getElementsByClassName(
      "baners__photo--mobile"
    );

    for (let i = 0; i < banersPhoto.length && i < baners.length; i++) {
      banersPhoto[i].src = baners[i].webImageUrl;
      banersPhoto[i].alt = baners[i].title;

      banersPhotoMobile[i].src = baners[i].mobileImageUrl;
      banersPhotoMobile[i].alt = baners[i].title;
    }
  })
  .catch((error) => console.error("Error fetching banners:", error));

//მონაცემების გამოტანა
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const categories = [
      ...data[0].childItems.map((item, index) => ({
        title: item.name,
        brands: item.childItems.map((brand) => brand.name),
        images: item.childItems.map((photo) => photo.imageUrl),
        className: `product-categories__featured__items__details--mobiles--${
          [
            "mobilebrands",
            "headphones",
            "smartwatch",
            "fitness",
            "mobileaccessories",
          ][index]
        }`,
      })),
      ...data[1].childItems.map((item, index) => ({
        title: item.name,
        brands: item.childItems.map((brand) => brand.name),
        images: item.childItems.map((photo) => photo.imageUrl),
        className: `product-categories__featured__items__details--tabs--${
          [
            "tabs",
            "smartkeybord",
            "graphictabs",
            "book",
            "accessories",
            "headphones",
            "cables",
          ][index]
        }`,
      })),
      ...data[2].childItems.map((item, index) => ({
        title: item.name,
        brands: item.childItems.map((brand) => brand.name),
        images: item.childItems.map((photo) => photo.imageUrl),
        className: `product-categories__featured__items__details--computers--${
          [
            "brands",
            "type",
            "memory",
            "accessories",
            "office",
            "projector",
            "headphones",
            "cables",
          ][index]
        }`,
      })),
      ...data[3].childItems.map((item, index) => ({
        title: item.name,
        brands: item.childItems.map((brand) => brand.name),
        images: item.childItems.map((photo) => photo.imageUrl),
        className: `product-categories__featured__items__details--gadgets--${
          [
            "reception",
            "face",
            "kitchen",
            "head",
            "monitoring",
            "moving",
            "outdoor",
            "sport",
            "animals",
            "light",
            "tools",
          ][index]
        }`,
      })),
      ...data[4].childItems.map((item, index) => ({
        title: item.name,
        brands: item.childItems.map((brand) => brand.name),
        images: item.childItems.map((photo) => photo.imageUrl),
        className: `product-categories__featured__items__details--brands--${
          [
            "brands",
            "categories",
            "headphones",
            "cyctem",
            "audio",
            "microphone",
          ][index]
        }`,
      })),
      ...data[5].childItems.map((item, index) => ({
        title: item.name,
        brands: item.childItems.map((brand) => brand.name),
        images: item.childItems.map((photo) => photo.imageUrl),
        className: `product-categories__featured__items__details--gaming--${
          [
            "playstation",
            "xbox",
            "nintendo",
            "console",
            "leptop",
            "accessories",
            "monitors",
          ][index]
        }`,
      })),
      ...data[6].childItems.map((item, index) => ({
        title: item.name,
        brands: item.childItems.map((brand) => brand.name),
        images: item.childItems.map((photo) => photo.imageUrl),
        className: `product-categories__featured__items__details--tv--${
          [
            "tv",
            "all",
            "monitor",
            "audio",
            "projector",
            "accessories",
            "media",
          ][index]
        }`,
      })),
      ...data[7].childItems.map((item, index) => ({
        title: item.name,
        brands: item.childItems.map((brand) => brand.name),
        images: item.childItems.map((photo) => photo.imageUrl),
        className: `product-categories__featured__items__details--photo--${
          [
            "photo",
            "optic",
            "accessories",
            "drone",
            "camera",
            "printer",
            "video",
            "smartphone",
          ][index]
        }`,
      })),
    ];

    categories.forEach((category) =>
      fillProductCategories(
        category.title,
        category.brands,
        category.className,
        category.images
      )
    );
    const imageClasses = [
      "product-categories__featured__items__details--mobiles--photo",
      "product-categories__featured__items__details--tabs--photo",
      "product-categories__featured__items__details--computers--photo",
      "product-categories__featured__items__details--gadgets--photo",
      "product-categories__featured__items__details--brands--photo",
      "product-categories__featured__items__details--gaming--photo",
      "product-categories__featured__items__details--tv--photo",
      "product-categories__featured__items__details--photo--mainphoto",
    ];
    imageClasses.forEach((cls, index) => {
      let image = document.createElement("img");
      image.src = data[index].imageUrl;
      document.getElementsByClassName(cls)[0].appendChild(image);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));

function fillProductCategories(title, brands, className, images) {
  const categoryDiv = document.getElementsByClassName(className);
  if (categoryDiv.length > 0) {
    const titleWrap = document.createElement("div");
    titleWrap.classList.add("titleWrap");

    const titleLink = document.createElement("a");
    titleLink.href = "#";

    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = title;
    titleLink.appendChild(sectionTitle);
    titleWrap.appendChild(titleLink);
    categoryDiv[0].appendChild(titleWrap);

    const brandWrap = document.createElement("div");
    brandWrap.classList.add("brandwrap");

    brands.forEach((brand, index) => {
      const brandLink = document.createElement("a");
      brandLink.href = "#";

      const sectionItems = document.createElement("p");
      sectionItems.textContent = brand;

      // Set the background image for the <p> tag
      if (images[index]) {
        sectionItems.style.position = "relative"; // Ensure positioning is relative for absolute children
        const background = document.createElement("span");
        background.classList.add("coverPhotoforMedia");
        background.style.backgroundImage = `url(${images[index]})`;
        background.style.position = "absolute";
        background.style.height = "100%";
        background.style.width = "100%";
        background.style.inset = "0px";
        sectionItems.appendChild(background);
        sectionItems.style.position = "relative"; // Keep <p> relative for absolute background
        sectionItems.style.padding = "5px"; // Add padding for better appearance
        background.style.backgroundSize = "cover";
        background.style.backgroundPosition = "center";
      }

      brandLink.appendChild(sectionItems);
      brandWrap.appendChild(brandLink);
    });

    categoryDiv[0].appendChild(brandWrap);
  }
}

// ჰოვერის ეფექტზე ინფორმაციის გამოჩენა/გაქრობა
const setDisplay = (element, display) => {
  element.style.display = display;
};

const handleMouseOver = (
  popup,
  mobileContainerDisplay,
  tabsDisplay,
  computerDisplay,
  gadgetsDisplay,
  brandsDisplay,
  gamingDisplay,
  tvDisplay,
  photoDisplay
) => {
  setDisplay(mobileContainer[0], mobileContainerDisplay);
  setDisplay(popupTabsSection[0], tabsDisplay);
  setDisplay(popupComputerSection[0], computerDisplay);
  setDisplay(popupGadgetsSection[0], gadgetsDisplay);
  setDisplay(popupBrandsSection[0], brandsDisplay);
  setDisplay(popupGamingSection[0], gamingDisplay);
  setDisplay(popupTvSection[0], tvDisplay);
  setDisplay(popupPhotoSection[0], photoDisplay);
  setDisplay(popupMobileSection[0], "flex");
  setDisplay(mainSectionSwiper[0], "none");
  hoverContainer[0].style.display = "block";
};

const handleMouseLeave = (popup, defaultDisplay) => {
  if (popup.matches(":hover")) {
    setDisplay(popup, "flex");
    setDisplay(mainSectionSwiper[0], "none");
  } else if (window.innerWidth <= 1024) {
    setDisplay(popup, "flex");
    setDisplay(mainSectionSwiper[0], defaultDisplay);
    // handleMouseOver(popupMobileSection[0],"flex","none","none","none","none","none","none","none")
    // hoverContainer[0].style.display = "block";
  } else {
    setDisplay(popup, "none");
    setDisplay(mainSectionSwiper[0], defaultDisplay);
    hoverContainer[0].style.display = "none";
  }
};
///

// hoverSection[0] for mobile
hoverSection[0].addEventListener("mouseover", () =>
  handleMouseOver(popupMobileSection[0], "flex", "none", "none")
);
hoverSection[0].addEventListener("mouseleave", () =>
  handleMouseLeave(popupMobileSection[0], "block")
);
popupMobileSection[0].addEventListener("mouseleave", () =>
  handleMouseLeave(popupMobileSection[0], "block")
);

// hoverSection[1] for tabs
hoverSection[1].addEventListener("mouseover", () =>
  handleMouseOver(popupMobileSection[0], "none", "flex", "none")
);
hoverSection[1].addEventListener("mouseleave", () =>
  handleMouseLeave(popupTabsSection[0], "block")
);

// hoverSection[2] for computers
hoverSection[2].addEventListener("mouseover", () =>
  handleMouseOver(popupMobileSection[0], "none", "none", "flex")
);
hoverSection[2].addEventListener("mouseleave", () =>
  handleMouseLeave(popupComputerSection[0], "block")
);
popupComputerSection[0].addEventListener("mouseleave", () =>
  handleMouseLeave(popupComputerSection[0], "block")
);

// hoverSection[3] for gadgets
hoverSection[3].addEventListener("mouseover", () =>
  handleMouseOver(popupMobileSection[0], "none", "none", "none", "flex")
);
hoverSection[3].addEventListener("mouseleave", () =>
  handleMouseLeave(popupGadgetsSection[0], "block")
);
popupGadgetsSection[0].addEventListener("mouseleave", () =>
  handleMouseLeave(popupGadgetsSection[0], "block")
);

// hoverSection[4] for brands
hoverSection[4].addEventListener("mouseover", () =>
  handleMouseOver(popupMobileSection[0], "none", "none", "none", "none", "flex")
);
hoverSection[4].addEventListener("mouseleave", () =>
  handleMouseLeave(popupBrandsSection[0], "block")
);
popupBrandsSection[0].addEventListener("mouseleave", () =>
  handleMouseLeave(popupBrandsSection[0], "block")
);

// hoverSection[5] for gaming
hoverSection[5].addEventListener("mouseover", () =>
  handleMouseOver(
    popupMobileSection[0],
    "none",
    "none",
    "none",
    "none",
    "none",
    "flex"
  )
);
hoverSection[5].addEventListener("mouseleave", () =>
  handleMouseLeave(popupGamingSection[0], "block")
);
popupGamingSection[0].addEventListener("mouseleave", () =>
  handleMouseLeave(popupGamingSection[0], "block")
);

// hoverSection[6] for tv
hoverSection[6].addEventListener("mouseover", () =>
  handleMouseOver(
    popupMobileSection[0],
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "flex"
  )
);
hoverSection[6].addEventListener("mouseleave", () =>
  handleMouseLeave(popupTvSection[0], "block")
);
popupTvSection[0].addEventListener("mouseleave", () =>
  handleMouseLeave(popupTvSection[0], "block")
);

// hoverSection[7] for photo
hoverSection[7].addEventListener("mouseover", () =>
  handleMouseOver(
    popupMobileSection[0],
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "flex"
  )
);
hoverSection[7].addEventListener("mouseleave", () =>
  handleMouseLeave(popupPhotoSection[0], "block")
);
popupPhotoSection[0].addEventListener("mouseleave", () =>
  handleMouseLeave(popupPhotoSection[0], "block")
);

//swiper
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//second swiper
var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const sectionLines = document.getElementsByClassName(
    "product-categories__featured--item__content"
  );

  function toggleBorder(event) {
    event.preventDefault(); // Prevent the default action of the link

    // Check if the viewport width is 1024px or less
    if (window.matchMedia("(max-width: 1024px)").matches) {
      // Remove border from all sections
      for (let sectionLine of sectionLines) {
        sectionLine.style.borderLeft = "0"; // Reset all borders
      }

      // Add border to the clicked element
      const sectionLine = event.currentTarget; // Get the clicked element
      (hoverSection[0].style.borderLeft = "0"),
        (sectionLine.style.borderLeft = "2px solid var(--orange-main)"); // Set border
    }
  }

  // Attach click event listener to each element
  for (let sectionLine of sectionLines) {
    sectionLine.addEventListener("click", toggleBorder);
  }
});

function addEventListeners() {
  // Remove existing listeners
  Array.from(hoverSection).forEach((section) => {
    section.replaceWith(section.cloneNode(true));
  });

  const isMobile = window.matchMedia("(max-width: 1024px)").matches;

  const handleEvent = (index) => {
    if (isMobile) {
      handleMouseLeave(mobileContainer[0], "block"),
        (hoverSection[0].style.borderLeft = "2px solid var(--orange-main)");
      hoverSection[index].addEventListener("click", () =>
        handleMouseOver(
          popupMobileSection[0],
          ...Array(8)
            .fill("none")
            .fill("flex", index, index + 1)
        )
      );
    } else {
      hoverSection[index].addEventListener("mouseover", () =>
        handleMouseOver(
          popupMobileSection[0],
          ...Array(8)
            .fill("none")
            .fill("flex", index, index + 1)
        )
      );
      hoverSection[index].addEventListener("mouseleave", () =>
        handleMouseLeave(popupMobileSection[0], "block")
      );
    }
  };

  for (let i = 0; i < hoverSection.length; i++) {
    handleEvent(i);
  }
}

// Call the function on page load and resize
addEventListeners();
window.addEventListener("resize", addEventListeners);

// Assuming you have this click handler function
const handleClick = () => {
  // Your logic here
  handleMouseOver(
    popupMobileSection[0],
    "flex", // Show the mobile container
    "none", // Hide other sections
    "none",
    "none",
    "none",
    "none",
    "none"
  );
};

// Automatically call this function on page load
if (window.matchMedia("(max-width: 1024px)").matches) {
  handleClick(); // Call the function without a click
}

// Add click listener for hoverSection[0]
hoverSection[0].addEventListener("click", handleClick);

// Handle window resize to reopen if necessary
window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 1024px)").matches) {
    handleClick(); // Call the function again without a click
  }
});



const scrollToTopButton = document.getElementById('scrollToTop');

// Show button when scrolling down
window.onscroll = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
};

// Scroll to top on click
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
