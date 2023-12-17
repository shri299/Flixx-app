// console.log("helluuuu");

const global = {
    currentPage : window.location.pathname
}

console.log(global);


async function displayPopularMovies(){
    const {results} = await fetchdata('movie/popular');

    results.forEach((popularMovie)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href='movie-details.html?id=${popularMovie.id}'>
        ${
            popularMovie.poster_path ?
            `<img
            src='https://image.tmdb.org/t/p/w500${popularMovie.poster_path}'
            class='card-img-top'
            alt=Movie Title
        />` : 
        `<img
        src='../images/no-image.jpg'
        class='card-img-top'
        alt=Movie Title
    />`
        }
        </a>
        <div class='card-body'>
            <h5 class='card-title'>${popularMovie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${popularMovie.release_date}</small>
            </p>
        </div>`;

        document.querySelector('#popular-movies').appendChild(div);
    })
}


//fetch data from API

async function fetchdata(endpoint) {
    const API_KEY = '97d58ba87690e52854f1362c2a996e0c';
    const API_URL = 'https://api.themoviedb.org/3/';

    const resObj = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await resObj.json();
    return data;
}

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
            //console.log("home");
            displayPopularMovies();
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



// API Key
// 97d58ba87690e52854f1362c2a996e0c
// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2Q1OGJhODc2OTBlNTI4NTRmMTM2MmMyYTk5NmUwYyIsInN1YiI6IjY1NzllNWQ1NGQyM2RkMDBjNmFhY2I2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FsGaABXSn-zx5INoA3ScYxFSRYSDkzgMaDehnIbMRMU
