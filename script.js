// === КОРЗИНА ===
let cart = [];

// Обновить отображение корзины
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} — ${item.price} NOK`;
        
        // Кнопка удаления
        const btnDel = document.createElement('button');
        btnDel.textContent = '×';
        btnDel.style.marginLeft = '10px';
        btnDel.style.cursor = 'pointer';
        btnDel.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };

        li.appendChild(btnDel);
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

// Добавить товар в корзину (вызывается из кнопок "Добавить")
function addToCart(name, price) {
    cart.push({name, price});
    updateCart();
}

// Открыть/закрыть корзину по иконке
const cartIcon = document.getElementById('cart-icon');
const cartWindow = document.getElementById('cart-window');

cartIcon.addEventListener('click', () => {
    if(cartWindow.style.display === 'block') {
        cartWindow.style.display = 'none';
    } else {
        cartWindow.style.display = 'block';
    }
});

// Отправка заказа
function submitOrder() {
    const nameInput = document.getElementById('order-name');
    const addressInput = document.getElementById('order-address');
    const status = document.getElementById('order-status');

    if(!nameInput.value.trim() || !addressInput.value.trim()) {
        alert('Fyll ut navn og adresse!');
        return;
    }

    if(cart.length === 0) {
        alert('Handlekurven er tom!');
        return;
    }

    status.innerHTML = `
        <p style="color:#00f3ff;">Takk, ${nameInput.value}!</p>
        <p>Din bestilling på ${cart.length} varer til totalt ${cart.reduce((sum, i) => sum + i.price, 0).toFixed(2)} NOK er registrert.</p>
        <p>Levering til: ${addressInput.value}</p>
    `;

    cart = [];
    updateCart();
    nameInput.value = '';
    addressInput.value = '';
}

// === ЧАТ-БОТ ===
const chatbotIcon = document.getElementById('chatbot-icon');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

chatbotIcon.addEventListener('click', () => {
    if(chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
    }
});

function sendMessage() {
    const msg = chatInput.value.trim();
    if(msg === '') return;

    // Добавляем сообщение пользователя
    const userMsg = document.createElement('p');
    userMsg.innerHTML = `<strong>Du:</strong> ${msg}`;
    chatMessages.appendChild(userMsg);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Имитируем ответ AI через секунду
    setTimeout(() => {
        const responses = [
            'Anbefaler NEON PEPPERONI XTREME med ekstra jalapeños!',
            'Leveringstid: 30-45 minutter til din lokasjon.',
            'Spesialtilbud i dag: 20% rabatt på burgere!',
            'Vår CYBER MOONRISE-drink er perfekt til din pizza.',
            'Har du prøvd vår signaturrett QUANTUM MARGHERITA med ekstra neon-saus?'
        ];
        const aiMsg = document.createElement('p');
        aiMsg.innerHTML = `<strong>AI:</strong> ${responses[Math.floor(Math.random() * responses.length)]}`;
        chatMessages.appendChild(aiMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Отправка при нажатии Enter
chatInput.addEventListener('keydown', e => {
    if(e.key === 'Enter') sendMessage();
});

// === ПЕРЕТАСКИВАНИЕ ===
function makeDraggable(elem) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elem.onpointerdown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;
        document.onpointerup = closeDragElement;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onpointermove = null;
        document.onpointerup = null;
    }
}

// Инициализация перетаскивания для корзины и чата
makeDraggable(cartWindow);
makeDraggable(chatWindow);
