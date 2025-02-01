 // Switch between Registration and Login pages
 document.getElementById('goToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registration-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
});

document.getElementById('goToRegister').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('registration-page').style.display = 'block';
});

// Handle registration form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    alert(result.message || 'Registration successful!');
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    alert(result.message  || 'Login successful!');   
});