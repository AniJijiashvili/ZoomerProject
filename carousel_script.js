// For carousel
document.querySelectorAll(".prev").forEach((button, index) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".product-carousel")[index].scrollBy({
      left: -200,
      behavior: "smooth",
    });
  });
});

document.querySelectorAll(".next").forEach((button, index) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".product-carousel")[index].scrollBy({
      left: 200,
      behavior: "smooth",
    });
  });
});

let seenProducts = [];

// Function to render seen products in the "Already Seen Products" section
function renderSeenProducts() {
  const seenProductsSection = document.querySelector(
    ".seen-products-carousel .product-list"
  );
  seenProductsSection.innerHTML = "";

  seenProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    // Check if previousPrice exists
    const priceHTML = product.previousPrice
      ? `<h4 class="product-new-price">${product.price} ₾ <span class="previous-price">${product.previousPrice} ₾</span></h4>`
      : `<h4 class="product-price">${product.price} ₾</h4>`;

    // Check if labelText is 'BEST PRICE' or 'NEW' and add a label if true
    const labelHTML =
      product.labelText === "BEST PRICE" || product.labelText === "NEW"
        ? `<div class="product-text-label" title="${product.name}">${product.labelText}</div>`
        : product.labelText === "Gifts"
        ? `<div class="product-text-label" title="${
            product.name
          }">${product.labelText.toUpperCase()}</div>
           <div class="gifts-label-icon" title="${
             product.name
           }"><img src="/icons/gift-box.svg" alt="gift-icon"></div>`
        : "";

    productCard.innerHTML = `
          ${labelHTML}
          <img src="${product.imageUrl}" alt="${
      product.name
    }" class="product-image" title="${product.name}">
          <div class="product-card--info">
            ${priceHTML}
            <p class="product-installment">თვეში: <span>${Math.round(
              product.price / 36
            )}</span> <span> ₾ </span>-დან</p>
            <a href="${product.link}" class="product-link" title="${
      product.name
    }">${product.name}</a>
          </div>
          <div class="product-actions">
              <button class="compare-btn"><img src="/icons/compare-card.svg" alt="card-icon"></button>
              <button class="add-cart-btn"><img src="/icons/cart-button.svg" alt="btn-img"> <span> დამატება </span></button>
          </div>
      `;

    // Add event listener to open product link in a new tab
    productCard.addEventListener("click", () => {
      let productUrl = product.route;
      if (!productUrl.startsWith("http")) {
        productUrl = `https://zoommer.ge/${productUrl}`;
      }
      window.open(productUrl, "_blank");
    });

    seenProductsSection.appendChild(productCard);
  });

  // If there are no seen products, hide the section
  const seenProductsContainer = document.querySelector(
    ".seen-products-carousel"
  );
  if (seenProducts.length === 0) {
    seenProductsContainer.style.display = "none";
  } else {
    seenProductsContainer.style.display = "block";
  }
}

// List of carousel types and their corresponding JSON keys
const carouselTypes = [
  "eager",
  "discover",
  "new",
  "tvs",
  "brands", // Adding the brands section
  "selfcare",
  "buds",
  "headphones",
  "laptops",
  "consoles",
  "caraccessories",
  "smarthome",
  "topproducts",
];

// Fetch and add products to the carousels
carouselTypes.forEach((carouselType) => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      const carousel = document.querySelector(
        `.product-carousel.${carouselType}`
      );

      // Conditional handling for brands
      if (carouselType === "brands") {
        data[carouselType].forEach((brand) => {
          const brandCard = document.createElement("div");
          brandCard.className = "brand-card";
          // Assuming you have specific HTML for brands
          brandCard.innerHTML = `<img src="${brand.imageUrl}" alt="${brand.name}" class="brand-logo">`;
          carousel.appendChild(brandCard);
        });
      } else {
        // Default behavior for non-brands carousels
        data[carouselType].forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "product-card";

          // Check if previousPrice exists
          const priceHTML = product.previousPrice
            ? `<h4 class="product-new-price">${product.price} ₾ <span class="previous-price">${product.previousPrice} ₾</span></h4>`
            : `<h4 class="product-price">${product.price} ₾</h4>`;

          // Check if labelText is 'BEST PRICE' or 'NEW' and add a label if true
          const labelHTML =
            product.labelText === "BEST PRICE" || product.labelText === "NEW"
              ? `<div class="product-text-label" title="${product.name}">${product.labelText}</div>`
              : product.labelText === "Gifts"
              ? `<div class="product-text-label" title="${
                  product.name
                }">${product.labelText.toUpperCase()}</div>
                 <div class="gifts-label-icon" title="${
                   product.name
                 }"><img src="/icons/gift-box.svg" alt="gift-icon"></div>`
              : "";

          productCard.innerHTML = `
                ${labelHTML}
                <img src="${product.imageUrl}" alt="${
            product.name
          }" class="product-image" title="${product.name}">
                <div class="product-card--info">
                  ${priceHTML}
                  <p class="product-installment">თვეში: <span>${Math.round(
                    product.price / 36
                  )}</span> <span> ₾ </span>-დან</p>
                  <a href="${product.link}" class="product-link" title="${
            product.name
          }">${product.name}</a>
                </div>
                <div class="product-actions">
                    <button class="compare-btn"><img src="/icons/compare-card.svg" alt="card-icon"></button>
                    <button class="add-cart-btn"><img src="/icons/cart-button.svg" alt="btn-img"> <span> დამატება </span></button>
                </div>
            `;
          // Add click event listener to redirect to product.route
          productCard.addEventListener("click", () => {
            // seenProducts.push(product);
            seenProducts.unshift(product);
            console.log(seenProducts);
            // Re-render seen products section
            renderSeenProducts();
            let productUrl = product.route;

            // If the route doesn't start with "http", prepend the root URL
            if (!productUrl.startsWith("http")) {
              productUrl = `https://zoommer.ge/${productUrl}`;
            }

            // Open the product URL in a new tab
            window.open(productUrl, "_blank");
          });
          carousel.appendChild(productCard);
        });
      }
    });
});

// Initial render of seen products
renderSeenProducts();
