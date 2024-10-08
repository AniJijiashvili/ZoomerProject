document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (url, id) => {
    fetch(url)
      .then((response) => response.text())
      .then((details) => {
        document.getElementById(id).innerHTML = details;
        if (id === "header") {
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const loadScript = (src) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  };

  loadComponent("header.html", "header");
  loadComponent("footer.html", "footer");
});
