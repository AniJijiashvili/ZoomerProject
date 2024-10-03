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
