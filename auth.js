document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.elements[0].value;
    const email = this.elements[1].value;
    
    // Сохраняем пользователя в localStorage
    localStorage.setItem('currentUser', JSON.stringify({
        username,
        email
    }));
    
    alert('Регистрация успешна!');
    window.location.href = 'index.html';
});
