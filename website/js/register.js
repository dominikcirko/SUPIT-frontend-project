const registerForm = document.getElementById('loginForm');

	
	
function registerUser(username, password) {
    fetch('https://www.fulek.com/data/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.isSuccess) {
            alert('Registration successful!');
        } else {
            throw new Error('Registration failed. No success message received.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Registration failed!');
    });
}

function validateForm() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert('Please fill in all fields.');
        return false;
    }

    return true;
}

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateForm()) {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        registerUser(username, password);
    }
});