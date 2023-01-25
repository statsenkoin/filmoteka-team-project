/**
 * API ключ (v3 auth)
 * e55542ecb6aab3d889d16953eac82937
 * 
 * Приклад API-запиту
 * https://api.themoviedb.org/3/movie/550?api_key=e55542ecb6aab3d889d16953eac82937
 * 
 * Токен доступу для читання API (v4 auth)
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTU1NDJlY2I2YWFiM2Q4ODlkMTY5NTNlYWM4MjkzNyIsInN1YiI6IjYzY2NmY2QxOWE2NDM1MDBhZTAzODI3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZrJwlyhckYNnJMhcHP9AOOvED0EU5i-2cuiwVbINE00
 */

const API_KEY = 'e55542ecb6aab3d889d16953eac82937';
const URL = 'https://api.themoviedb.org/3';
const QUERY_TRENDING = '/trending/movie/week';
const QUERY_GENRE = '/genre/movie/list';

export async function fetchTrending(page) {
  try {
    const responce = fetch(
      `${URL}${QUERY_TRENDING}?api_key=${API_KEY}&page=${page}`
    );
    return (await responce).json();
  } catch (error) {
    return console.log('error :>> ', error);
  }
}

async function fetchGenre() {
  try {
    const responce = fetch(`${URL}${QUERY_GENRE}?api_key=${API_KEY}`);
    return (await responce).json();
  } catch (error) {
    return console.log('error :>> ', error);
  }
}

export async function getGenreList() {
  const data = await fetchGenre();
  return data.genres;
}
// export function getGenreById(genre_ids) {
//   return genreList
//     .filter(genre => genre_ids.includes(genre.id))
//     .map(item => item.name)
//     .join(', ');
// }
