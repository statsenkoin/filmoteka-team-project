// import { getGenreById } from './themoviedb-api-service';
import { genreList } from './filmoteka';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

function getGenreById(genre_ids) {
  return genreList
    .filter(genre => genre_ids.includes(genre.id))
    .map(item => item.name)
    .join(', ');
}

export async function markupTrending(filmList, gallery) {
  let markup = filmList.reduce(
    (acc, { poster_path, release_date, genre_ids, id, original_title }) => {
      const genreString = getGenreById(genre_ids);
      return (acc += `<div class="film-box" data-id="${id}">
      <img class="film-poster"src="${IMAGE_URL}${poster_path}">
      <p>${original_title}</p>
      <p> ${genreString}</p>
      <p> ${parseInt(release_date)}</p>
      <p>id: ${id}</p>
      </div>`);
    },
    ``
  );
  gallery.innerHTML = markup;
}

export async function markupModalFilmInfo(targetFilm, modalFilmInfo) {
  const {
    title,
    poster_path,
    overview,
    genre_ids,
    id,
    original_title,
    popularity,
    vote_count,
    vote_average,
  } = targetFilm;
  const genreString = getGenreById(genre_ids);
  const markup = `<div class="film-info">
         <img src="${IMAGE_URL}${poster_path}">
         <div class="film-info-wrapper">
           <p>${title}</p>
           <p>Vote ${vote_average}</p>
           <p>Votes ${vote_count}</p>
           <p>Popularity ${popularity}</p>
           <p>Original Title ${original_title}</p>
           <p>Genre ${genreString}</p>
           <p>ABOUT</p>
           <p>${overview}</p>
           <p>id: ${id}</p>
           <button type="button">Add to watched</button>
           <button type="button">Add to queue</button>
         </div>
        </div>`;

  modalFilmInfo.innerHTML = markup;
}
