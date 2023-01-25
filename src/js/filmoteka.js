import { fetchTrending, getGenreList } from './themoviedb-api-service';
import { markupTrending, markupModalFilmInfo } from './markups';
import { updatePagination, getCurrentPage } from './custom-pagination';

let filmList;

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', onCardClick);

const modalFilmInfo = document.querySelector('.modal-film-info');

// ===================================================================
let totalPages = 1;
let currentPage = 1;
let genreList;
const paginationRef = document.querySelector('.pagination');
paginationRef.addEventListener('click', onPaginationButtonClick);
// ===================================================================

initGallery();

export { genreList };

// ===================================================================

async function onPaginationButtonClick(event) {
  const targetPage = getCurrentPage(event);
  if (targetPage === currentPage) return;
  currentPage = targetPage;

  await updateGallery();
}
// ===================================================================

async function initGallery() {
  genreList = await getGenreList();
  await updateGallery();
}

async function updateGallery() {
  const data = await fetchTrending(currentPage);
  filmList = data.results;
  totalPages = data.total_pages;
  markupTrending(filmList, gallery);
  updatePagination(currentPage, totalPages, paginationRef);
}

function onCardClick(event) {
  const filmBox = event.target.closest('.film-box');
  if (!filmBox) return;
  const filmBoxId = Number(filmBox.dataset.id);
  const targetFilm = filmList.find(film => film.id === filmBoxId);
  markupModalFilmInfo(targetFilm, modalFilmInfo);
}
