// Корзина
let cart = [];
let total = 0;

// Добавление в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        
        cart.push({ name, price });
        total += price;
        
        updateCart();
    });
});

// Обновление корзины
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} NOK`;
        cartItems.appendChild(li);
    });
    
    cartTotal.textContent = total;
}

// Оформление заказа
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Kurven er tom!');
    } else {
        alert(`Takk for din bestilling! Total: ${total} NOK`);
        cart = [];
        total = 0;
        updateCart();
    }
});
