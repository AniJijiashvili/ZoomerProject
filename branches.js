// Get the dropdown button and list elements
const dropdownButton = document.getElementById("dropdownButton");
const dropdownList = document.getElementById("dropdownList");
const dropdownIcon = document.getElementById("drop_down");
const dropupIcon = document.getElementById("drop_up");
dropdownList.style.display = "none";

// Toggle the dropdown list visibility when clicking the button
dropdownButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevents the click from closing the dropdown immediately

  // Toggle dropdown list visibility
  dropdownList.style.display =
    dropdownList.style.display === "block" ? "none" : "block";

  // Toggle the icons
  if (dropdownList.style.display === "block") {
    dropdownIcon.style.display = "none";
    dropupIcon.style.display = "block";
  } else {
    dropdownIcon.style.display = "block";
    dropupIcon.style.display = "none";
  }
});

// Handle option selection
const dropdownItems = dropdownList.querySelectorAll("li");
dropdownItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    // Prevent event from bubbling up to document listener
    event.stopPropagation();

    const selectedValue = this.dataset.value;

    // If "ყველა ქალაქი" is selected, reset to default text
    if (selectedValue === "default") {
      dropdownButton.querySelector("h4").textContent = "აირჩიე ქალაქი";
    } else {
      dropdownButton.querySelector("h4").textContent = selectedValue;
    }

    // After selecting an item, hide the dropdown and toggle icons
    dropdownList.style.display = "none";
    dropdownIcon.style.display = "block"; // Show down icon
    dropupIcon.style.display = "none"; // Hide up icon
  });
});

// Close the dropdown when clicking outside of it
document.addEventListener("click", function (event) {
  if (
    !dropdownButton.contains(event.target) &&
    !dropdownList.contains(event.target)
  ) {
    dropdownList.style.display = "none";
    dropdownIcon.style.display = "block"; // Show down icon
    dropupIcon.style.display = "none"; // Hide up icon
  }
});

/////////////////////////////////////////

// Select the checkbox container
const checkboxContainer = document.querySelector(
  ".branches__checkbox-container"
);

// Select the images
const checkBox = document.getElementById("check-box");
const activatedCheckBox = document.getElementById("activated_check-box");

// Initially, hide the activated checkbox image
activatedCheckBox.style.display = "none";

// Add an event listener to the container for clicks
checkboxContainer.addEventListener("click", function () {
  // Check if the unchecked checkbox is visible
  if (checkBox.style.display !== "none") {
    // If yes, hide the unchecked and show the activated checkbox
    checkBox.style.display = "none";
    activatedCheckBox.style.display = "block";
  } else {
    // Otherwise, hide the activated checkbox and show the unchecked checkbox
    checkBox.style.display = "block";
    activatedCheckBox.style.display = "none";
  }
});

//////////////////////////////////////////////

// Fetch the branches from the JSON file
fetch("branches.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("branch-container");

    // Loop through the branches and create HTML for each one
    data.forEach((branch) => {
      // Create branch card element
      const branchCard = document.createElement("div");
      branchCard.className = "branch-card";
      const containerWidth = container.clientWidth;
      if (containerWidth >= 1024) {
        branchCard.style.width = `${(containerWidth - 42) / 3}px`;
      }

      //Create upper part
      const branchUpper = document.createElement("div");
      branchUpper.className = "branch-upper";
      // Create branch city and phone number (as header)
      const branchHeader = document.createElement("div");
      branchHeader.className = "branch-header";
      // city
      const branchCityText = document.createElement("h4");
      branchCityText.textContent = branch.city;
      branchCityText.className = "branch-city";
      // phone
      const branchPhoneText = document.createElement("h4");
      branchPhoneText.textContent = branch.phone;
      branchPhoneText.className = "branch-phone";
      branchHeader.appendChild(branchCityText);
      branchHeader.appendChild(branchPhoneText);

      const branchAddress = document.createElement("div");
      branchAddress.className = "branch-address";
      branchAddress.textContent = branch.address;
      // Append upper part
      branchUpper.appendChild(branchHeader);
      branchUpper.appendChild(branchAddress);

      //Create lower part
      // Create work days
      const branchHours = document.createElement("div");
      branchHours.className = "branch-hours";
      const workH = branch.workingHours;
      const workFrom = workH[1].from;
      const workTo = workH[1].to;
      const weekFrom = workH[0].from;
      const weekTo = workH[0].to;
      const workDays = document.createElement("p");
      workDays.textContent = `ორშ-შაბ: ${workFrom} - ${workTo}`;
      const weekend = document.createElement("p");
      weekend.textContent = `კვირა: ${weekFrom} - ${weekTo}`;
      branchHours.appendChild(workDays);
      branchHours.appendChild(weekend);

      // Append the card
      branchCard.appendChild(branchUpper);
      branchCard.appendChild(branchHours);

      // Append branch card to the container
      container.appendChild(branchCard);
    });
  })
  .catch((error) => console.error("Error fetching branch data:", error));
