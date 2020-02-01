const MOVIE_API_URL = 'https://www.omdbapi.com/';
const API_KEY = 'c64e9e04';

const client = {
  get: async (query) => {
    const url = `${MOVIE_API_URL}?${query}&apikey=${API_KEY}`;
    const data = await fetch(url);
    const json = await data.json();
    return json;
  }
}

export async function getMovies (searchValue = 'space', page = 2) {
  const query = `s=${searchValue}&page=${page}`;
  const movies = await client.get(query);
  return movies;
}

export async function getMovieById (id) {
  const query = `i=${id}`;
  const movie = await client.get(query);
  return movie;
}