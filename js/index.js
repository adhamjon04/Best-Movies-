const MOVIES = movies.splice(0, 100);

let pages = 1;
let limit = 8;

const movieList = findElement('.movie-list')

const movieSelect = findElement('.form-select')
const movieForm = findElement('.movie-form')
const movieNextBtn = findElement('.next-btn')
const searchText = findElement('.js-input')
const moviePrevBtn = findElement('.prev-btn')
const sort = findElement('.js-sort')
const movieTemplate = findElement('.movie-card').content;

function createMovieCard(movie) {

    let movieTemplateClone = movieTemplate.cloneNode(true);
    let movieImg = findElement('.movie-img', movieTemplateClone);
    let movieTitle = findElement('.movie-title', movieTemplateClone);
    let movieGenre = findElement('.movie-genre', movieTemplateClone);
    let movieRating = findElement('.movie-reting', movieTemplateClone);
    let movieYear = findElement('.movie-year', movieTemplateClone);

    let movieMore = findElement('.js-more', movieTemplateClone)


    movieImg.src = movie.smallPoster;
    movieTitle.textContent = movie.title;
    movieGenre.textContent = movie.categories.join(', ');
    movieYear.textContent = movie.year + ' y';
    movieRating.textContent = '★' + movie.imdbRating;
    movieMore.dataset.id = movie.imdbId;

    movieList.appendChild(movieTemplateClone)
}

let categories = [];

function uniqueCategoreis(category) {

    let elOption = document.createElement('option')

    if (!categories.includes(category)) {
        categories.push(category)
        elOption.textContent = category;
        movieSelect.append(elOption)
    }
}

function renderMovie(movies) {

    movies.slice(0, limit).forEach((movie) => {
        createMovieCard(movie);

        movie.categories.forEach((category) => {
            uniqueCategoreis(category);

        })
    })
}
renderMovie(MOVIES)

function handleSubmit(evt) {
    evt.preventDefault();

    const categoryName = movieSelect.value;


    const pattern = new RegExp(searchText.value, 'gi');


    movieList.innerHTML = null;


    let filteredMovie = []

    if (categoryName !== 'all') {

        filteredMovie = MOVIES.filter((movie) =>
            movie.categories.includes(categoryName)
        )

    } else {
        filteredMovie = MOVIES;

    }

    filteredMovie = filteredMovie.filter((movie) => movie.title.match(pattern)).sort(obj[sort.value])

    filteredMovie.forEach(movie => {

        createMovieCard(movie)
    })
}
movieForm.addEventListener("submit", handleSubmit)


function desabeledPrev() {

    if (pages === 1) {
        moviePrevBtn.disabled = true;
    } else {
        moviePrevBtn.disabled = false;
    }
}

function desabeledNext() {

    let lastPage = Math.ceil(MOVIES.length / limit)

    if (pages === lastPage) {
        movieNextBtn.disabled = true;
    } else {
        movieNextBtn.disabled = false;
    }
}

function handleNextBtn() {

    pages = pages + 1;

    movieList.innerHTML = null;
    MOVIES.slice((pages - 1) * limit, pages * limit).forEach((movie) => {

        createMovieCard(movie);



    })
    desabeledPrev()
    desabeledNext()
}



function handlePrevBtn() {

    pages = pages - 1;

    movieList.innerHTML = null;
    MOVIES.slice((pages - 1) * limit, pages * limit).forEach((movie) => {

        createMovieCard(movie);
    })
    desabeledPrev()
    desabeledNext()
}


movieNextBtn.addEventListener('click', handleNextBtn);
moviePrevBtn.addEventListener('click', handlePrevBtn);



function handleMore(evt) {

    if (evt.target.matches('.js-more')) {

        let foundMovie = MOVIES.find((movie) => movie.imdbId === evt.target.dataset.id)

        let modalTitle = document.querySelector('.modal-title')
        let modalImg = document.querySelector('.modal-img')
        let modalGenre = document.querySelector('.modal-genre')
        let modalSummary = document.querySelector('.modal-summary')


        modalTitle.textContent = foundMovie.title;
        modalImg.src = foundMovie.smallPoster;
        modalGenre.textContent = ' Janr:' + '   ' + foundMovie.categories;
        modalSummary.textContent = foundMovie.summary;

    }

}

movieList.addEventListener('click', handleMore)