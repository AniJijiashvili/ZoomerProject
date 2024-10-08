// For the eager carousel
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

// Fetching and adding products to the eager carousel
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const carousel = document.querySelector(".product-carousel.eager");
    data.eager.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      // Check if previousPrice exists
      const priceHTML = product.previousPrice
        ? `<h4 class="product-new-price">${product.price} ₾ <span class="previous-price">${product.previousPrice} ₾</span></h4>`
        : `<h4 class="product-price">${product.price} ₾</h4>`;

      // Check if labelText is 'BEST PRICE' and add a label if true
      const labelHTML =
        product.labelText === "BEST PRICE"
          ? `<div class="best-price-label">${product.labelText}</div>`
          : "";

      productCard.innerHTML = `
            ${labelHTML}
            <img src="${product.imageUrl}" alt="${
        product.name
      }" class="product-image">
            <div class="product-card--info">
              ${priceHTML}
              <p class="product-installment">თვეში: <span>${Math.round(
                product.price / 36
              )}</span> <span> ₾ </span>-დან</p>
              <a href="${product.link}" class="product-link">${product.name}</a>
            </div>
            <div class="product-actions">
                <button class="compare-btn"><img src="/icons/compare-card.svg" alt="card-icon"></button>
                <button class="add-cart-btn"><img src="/icons/cart-button.svg" alt="btn-img"> <span> დამატება </span></button>
            </div>
        `;
      carousel.appendChild(productCard);
    });
  });

// Fetching and adding products to the discover carousel
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const carousel = document.querySelector(".product-carousel.discover");
    data.discover.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      // Check if previousPrice exists
      const priceHTML = product.previousPrice
        ? `<h4 class="product-new-price">${product.price} ₾ <span class="previous-price">${product.previousPrice} ₾</span></h4>`
        : `<h4 class="product-price">${product.price} ₾</h4>`;
      // Check if labelText is 'BEST PRICE' and add a label if true
      const labelHTML =
        product.labelText === "BEST PRICE"
          ? `<div class="best-price-label">${product.labelText}</div>`
          : "";
      productCard.innerHTML = `
            ${labelHTML}
            <img src="${product.imageUrl}" alt="${
        product.name
      }" class="product-image">
            <div class="product-card--info">
              ${priceHTML}
              <p class="product-installment">თვეში: <span>${Math.round(
                product.price / 36
              )}</span> <span> ₾ </span>-დან</p>
              <a href="${product.link}" class="product-link">${product.name}</a>
            </div>
            <div class="product-actions">
                <button class="compare-btn"><img src="/icons/compare-card.svg" alt="card-icon"></button>
                <button class="add-cart-btn"><img src="/icons/cart-button.svg" alt="btn-img"> <span> დამატება </span></button>
            </div>
        `;
      carousel.appendChild(productCard);
    });
  });
