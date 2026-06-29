
import axios from "axios";
const API_KEY='b1f162d2d371f75c9aad0f6faec3fe1e'
const api=axios.create({baseURL:'https://api.themoviedb.org/3'})
export const getPopular=()=>api.get(`/movie/popular?api_key=${API_KEY}&language=es-ES`)
export const searchMovies=(q)=>api.get(`/search/movie?api_key=${API_KEY}&query=${q}&language=es-ES`)
export const movieDetail=(id)=>api.get(`/movie/${id}?api_key=${API_KEY}&language=es-ES`)
export const genres=()=>api.get(`/genre/movie/list?api_key=${API_KEY}&language=es-ES`)
