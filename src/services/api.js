import axios from "axios";

const API_KEY = "b1f162d2d371f75c9aad0f6faec3fe1e";
const URL = "https://api.themoviedb.org/3";

/* =====================
   🎬 PELÍCULAS
===================== */

export async function getPopularMovies() {
  const res = await axios.get(
    `${URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
  );
  return res.data;
}

export async function searchMovies(query) {
  const res = await axios.get(
    `${URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`
  );
  return res.data;
}

export async function getMoviesByGenre(id) {
  const res = await axios.get(
    `${URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${id}`
  );
  return res.data;
}

/* =====================
   📺 SERIES
===================== */

export async function getPopularSeries() {
  const res = await axios.get(
    `${URL}/tv/popular?api_key=${API_KEY}&language=es-ES&page=1`
  );
  return res.data;
}

export async function searchSeries(query) {
  const res = await axios.get(
    `${URL}/search/tv?api_key=${API_KEY}&language=es-ES&query=${query}`
  );
  return res.data;
}

export async function getSeriesByGenre(id) {
  const res = await axios.get(
    `${URL}/discover/tv?api_key=${API_KEY}&language=es-ES&with_genres=${id}`
  );
  return res.data;
}

/* =====================
   🎭 GENEROS (compartido)
===================== */

export async function getGenres() {
  const res = await axios.get(
    `${URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
  );
  return res.data;
}