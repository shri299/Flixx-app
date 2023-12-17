// console.log("helluuuu");

const global = {
    currentPage : window.location.pathname
}

console.log(global);

//highlight active link

function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

//router

function init(){
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log("home");
            break;
        
        case '/shows.html':
            console.log("shows page");
            break;

        case '/movie-details.html':
            console.log("movies page");
            break;
        
        case '/tv-details.html':
            console.log("tv page");
            break;

        case '/search.html':
            console.log("search page");
            break;

        default:
            console.log("checking");
            break;
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init);