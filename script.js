document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (url, id) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((details) => {
        document.getElementById(id).innerHTML = details;
        if (id === "header") {
          loadScript("header.js");
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
