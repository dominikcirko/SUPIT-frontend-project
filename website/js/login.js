function authenticateUser(username, password) {
    return fetch('https://www.fulek.com/data/api/user/login', {
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
        if (data && data.data.token) {
            return data.data.token;
        } else {
            throw new Error('Login failed. No token received.');
        }
    });
}

function handleLogin(username, password) {
    authenticateUser(username, password)
        .then(token => {
            if (token) {
                sessionStorage.setItem('jwt', token);
                sessionStorage.setItem('username', username);
                location.replace("nastavni-plan.html");
            } else {
                throw new Error('Login failed!');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed!');
        });
}

function validateLoginForm() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (username === '' || password === '') {
        alert('Username and password cannot be empty.');
        return false;
    }

    return true;
}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateLoginForm()) {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        handleLogin(username, password);
    }
});