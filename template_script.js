// script.js
document.querySelector(".prev").addEventListener("click", () => {
  document.querySelector(".product-carousel").scrollBy({
    left: -200,
    behavior: "smooth",
  });
});

document.querySelector(".next").addEventListener("click", () => {
  document.querySelector(".product-carousel").scrollBy({
    left: 200,
    behavior: "smooth",
  });
});

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const carousel = document.querySelector(".product-carousel");
    data.eager.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
            <h4 class="product-price">${product.price}</h4>
            <p class="product-installment">თვეში: <span>${product.installment}</span> -დან</p>
            <a href="${product.link}" class="product-link">${product.name}</a>
            <div class="product-actions">
                <button class="compare-btn">შედარება</button>
                <button class="add-cart-btn">დამატება</button>
            </div>
        `;
      carousel.appendChild(productCard);
    });
  });
