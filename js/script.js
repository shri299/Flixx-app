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

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

async function displayPopularShows() {
    const {results} = await fetchdata('tv/popular');

    results.forEach((popularMovie)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href='tv-details.html?id=${popularMovie.id}'>
        ${
            popularMovie.poster_path ?
            `<img
            src='https://image.tmdb.org/t/p/w500${popularMovie.poster_path}'
            class='card-img-top'
            alt=${popularMovie.name}
        />` : 
        `<img
        src='../images/no-image.jpg'
        class='card-img-top'
        alt=${popularMovie.name}
    />`
        }
        </a>
        <div class='card-body'>
            <h5 class='card-title'>${popularMovie.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${popularMovie.first_air_date}</small>
            </p>
        </div>`;

        document.querySelector('#popular-shows').appendChild(div);
    })
}
async function displayMovieDetails() {
    const num = window.location.search.split('=')[1];
    const movie = await fetchdata(`movie/${num}`);

    //over lay for background image

    displayBackgroundImage('movie',movie.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
    <div>
      ${
        movie.poster_path ?
        `<img
        src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
        class='card-img-top'
        alt=${movie.title}
    />` : 
    `<img
    src='../images/no-image.jpg'
    class='card-img-top'
    alt=${movie.title}
/>`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre)=>
            `<li>${genre.name}</li>`
        ).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies.map((genre)=>
            `${genre.name}`
        ).join(', ')}
          </div>
        </div>
    `;

    document.querySelector('#movie-details').appendChild(div);

}

function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type=='movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }
}


//fetch data from API

async function fetchdata(endpoint) {
    const API_KEY = '97d58ba87690e52854f1362c2a996e0c';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const resObj = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await resObj.json();

    hideSpinner();

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
            //console.log("shows page");
            displayPopularShows();
            break;

        case '/movie-details.html':
            console.log("movies page");
            displayMovieDetails();
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
