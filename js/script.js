// console.log("helluuuu");

const global = {
    currentPage : window.location.pathname
}

console.log(global);

//highlight active link

// function highlightActiveLink() {
//     const links = document.querySelectorAll('.nav-link');
//     links.forEach((link) => {
//         if (link.getAttribute('href') === global.currentPage) {
//             link.classList.add('active')
//         }
//     })
// }

// //router

// function init(){
//     switch (global.currentPage) {
//         case '/Flixx-app/':
//         case '/Flixx-app/index.html':
//             console.log("home");
//             break;
        
//         case '/Flixx-app/shows.html':
//             console.log("shows page");
//             break;

//         case '/Flixx-app/movie-details.html':
//             console.log("movies page");
//             break;
        
//         case '/Flixx-app/tv-details.html':
//             console.log("tv page");
//             break;

//         case '/Flixx-app/search.html':
//             console.log("search page");
//             break;

//         default:
//             console.log("checking");
//             break;
//     }
//     highlightActiveLink();
// }

// document.addEventListener('DOMContentLoaded',init);