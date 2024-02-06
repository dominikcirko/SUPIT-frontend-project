const logoutLink = document.querySelector('#logout');
logoutLink.addEventListener('click', function(event) {
    event.preventDefault();
    if(sessionStorage.getItem('jwt') !== ''){
        sessionStorage.setItem('jwt', '');
        sessionStorage.setItem('username', '');

        location.replace('index.html')
    }
});
