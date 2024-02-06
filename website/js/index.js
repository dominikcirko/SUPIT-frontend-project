var app = document.querySelector('.typewriter');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('Budi izvrstan u onom što voliš.')
    .pauseFor(1000)
    .deleteAll()
    .typeString('<strong><span class="highlight">ZAISKRI</strong>')
    .typeString('.')
    .pauseFor(1000)
    .start();
