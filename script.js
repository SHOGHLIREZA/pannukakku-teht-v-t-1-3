// === Vaihe 1

const form = document.getElementById('pancakeForm');
const totalPriceDisplay = document.getElementById('totalPriceDisplay');
const totalPriceBanner = document.getElementById('totalPrice');
const summaryText = document.getElementById('summaryText');
const seeOrderBtn = document.getElementById('seeOrder');

let toppings = []; 
let extras = [];   

// Vaihe 2
form.addEventListener('change', () => {
  updateSelections(); 
  updatePrice();      
});

// Vaihe 2
seeOrderBtn.addEventListener('click', showOrder);


// === Vaihe 2
function updateSelections() {
  toppings = [...form.querySelectorAll('.topping')]
    .filter(t => t.checked)
    .map(t => t.parentElement.textContent.trim());

  extras = [...form.querySelectorAll('.extra')]
    .filter(e => e.checked)
    .map(e => e.parentElement.textContent.trim());
}


// === Vaihe 1
function updatePrice() {
  const pancakeType = form.querySelector('#type');
  const basePrice = parseFloat(pancakeType.selectedOptions[0].dataset.price);

  const toppingsCost = toppings.length * 1;

  const extrasCost = [...form.querySelectorAll('.extra')]
    .filter(e => e.checked)
    .reduce((sum, e) => sum + parseFloat(e.dataset.price), 0);

  const delivery = form.querySelector('input[name="delivery"]:checked');
  const deliveryCost = delivery ? parseFloat(delivery.dataset.price) : 0;

  const total = basePrice + toppingsCost + extrasCost + deliveryCost;

  totalPriceDisplay.textContent = total.toFixed(2) + '€';
  totalPriceBanner.textContent = total.toFixed(2) + '€';

  // Vaihe 1
  totalPriceDisplay.classList.add('price-animation');
  setTimeout(() => totalPriceDisplay.classList.remove('price-animation'), 300);
}


// === Vaihe 2 + 3
function showOrder() {
  const name = document.getElementById('customerName').value.trim();
  const pancakeType = form.querySelector('#type').selectedOptions[0].textContent;
  const delivery = form.querySelector('input[name="delivery"]:checked')?.parentElement.textContent.trim();

  const order = {
    id: Date.now(), 
    customerName: name || 'Tuntematon',
    selectedPancake: pancakeType,
    toppings: [...toppings],
    extras: [...extras],
    deliveryMethod: delivery,
    totalPrice: totalPriceDisplay.textContent,
    status: 'waiting' 
  };

  // Vaihe 3
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Vaihe 2
  summaryText.innerHTML = `
    <strong>Nimi:</strong> ${order.customerName}<br>
    <strong>Pannukakku:</strong> ${order.selectedPancake}<br>
    <strong>Täytteet:</strong> ${order.toppings.join(', ') || 'Ei'}<br>
    <strong>Lisukkeet:</strong> ${order.extras.join(', ') || 'Ei'}<br>
    <strong>Toimitus:</strong> ${order.deliveryMethod}<br>
    <strong>Kokonaishinta:</strong> ${order.totalPrice}
  `;
}
