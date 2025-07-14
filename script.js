// Declare all necessary variables outside of the functions for easier access
const pancakeTypeSelect = document.getElementById("type");
const toppingCheckboxes = document.querySelectorAll(".topping");
const extraCheckboxes = document.querySelectorAll(".extra");
const totalPriceDisplay = document.getElementById("totalPriceDisplay");
const totalPrice = document.getElementById("totalPrice");

// Function to get the selected pancake type price
function getPancakeTypePrice() {
  return parseFloat(pancakeTypeSelect.value);
}

// Function to calculate the total price based on selected toppings
function calculateToppingsPrice() {
  let toppingsPrice = 0;
  
  toppingCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      toppingsPrice += parseFloat(checkbox.value);
    }
  });

  return toppingsPrice;
}

// Function to calculate the total price based on selected extras
function calculateExtrasPrice() {
  let extrasPrice = 0;
  
  extraCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      extrasPrice += parseFloat(checkbox.value);
    }
  });

  return extrasPrice;
}

// Function to calculate and update the total price
function updateTotalPrice() {
  const pancakeTypePrice = getPancakeTypePrice();
  const toppingsPrice = calculateToppingsPrice();
  const extrasPrice = calculateExtrasPrice();

  const total = pancakeTypePrice + toppingsPrice + extrasPrice;
  
  // Update the displayed price
  totalPriceDisplay.textContent = `${total}€`;
  totalPrice.textContent = `${total}€`;
}

// Function to add event listeners to the pancake type, toppings, and extras
function addEventListeners() {
  // Event listener for pancake type selection
  pancakeTypeSelect.addEventListener("change", updateTotalPrice);

  // Event listeners for topping checkboxes
  toppingCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateTotalPrice);
  });

  // Event listeners for extra checkboxes
  extraCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateTotalPrice);
  });
}

// Initialize the app by adding event listeners
document.addEventListener("DOMContentLoaded", function () {
  addEventListeners();
});
