function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

//handle scroll events
function handleScroll() {
    var cursiveParagraphs = document.querySelectorAll('.cursive p');

    cursiveParagraphs.forEach(function(paragraph) {
        if (isElementInViewport(paragraph)) {
            paragraph.style.opacity = 1; 
            paragraph.style.transition = 'opacity 0.5s ease-out'; 
        } else {
            paragraph.style.opacity = 0; 
            paragraph.style.transition = 'opacity 0.5s ease-out'; 
        }
    });
}

document.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', handleScroll);