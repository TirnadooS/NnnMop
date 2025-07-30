document.addEventListener('DOMContentLoaded', function() {
    // Корзина
    let cart = [];
    let total = 0;
    const cartIcon = document.getElementById('cart-icon');
    const cartElement = document.getElementById('cart');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Открыть/закрыть корзину
    cartIcon.addEventListener('click', () => {
        cartElement.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartElement.classList.remove('active');
    });

    // Добавить в корзину
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            
            // Добавляем анимацию
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 2000);
            
            // Добавляем в корзину
            cart.push({ name, price });
            total += price;
            
            updateCart();
            
            // Анимация иконки корзины
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // Обновить корзину
    function updateCart() {
        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price} NOK</span>
            `;
            cartItemsList.appendChild(li);
        });
        
        cartTotalElement.textContent = total;
        cartCount.textContent = cart.length;
    }

    // Оформить заказ
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Din kurv er tom! Legg til noe før du betaler.');
        } else {
            const confirmation = confirm(`Bekreft bestilling på ${total} NOK?`);
            if (confirmation) {
                alert(`Takk for din bestilling! Total: ${total} NOK`);
                cart = [];
                total = 0;
                updateCart();
                cartElement.classList.remove('active');
            }
        }
    });

    // 30+ позиций меню можно добавить динамически
    // Пример добавления через JS:
    const pizzaItems = [
        { name: "QUANTUM MARGHERITA", desc: "Tomatsaus, mozzarella di bufala, basilikum", price: 250 },
        { name: "NEON PEPPERONI XTREME", desc: "Pepperoni, jalapeños, fire sauce", price: 280 },
        // Добавьте остальные 28+ позиций...
    ];
    
    // Аналогично для других категорий
});
