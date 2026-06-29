<template>
  <div class="home">

    <!-- ========= BANNER ========= -->
<section
  v-if="featured"
  class="banner"
  :style="{
    backgroundImage:
      'linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.95)),url(https://image.tmdb.org/t/p/original'+featured.backdrop_path+')'
  }"
>

  <div class="banner-content">

    <span class="categoria">
      {{ type === "movie" ? "🎬 Película destacada" : "📺 Serie destacada" }}
    </span>

    <h1>
      {{ featured.title || featured.name }}
    </h1>

    <div class="datos">
      <span>⭐ {{ featured.vote_average }}</span>

      <span>
        📅 {{ featured.release_date || featured.first_air_date }}
      </span>
    </div>

    <p class="overview">
      {{ featured.overview }}
    </p>

    <div class="banner-buttons">
      <button
        class="play"
        @click="verDetalle(featured.id, type)"
      >
        ▶ Ver detalle
      </button>
    </div>

  </div>

</section>

    <!-- ========= TITULO ========= -->

    <div class="titulo">

      <h2>Movie Explorer</h2>

      <div class="tabs">

        <button
          :class="{ active: type==='movie' }"
          @click="cambiarTipo('movie')"
        >
          🎬 Películas
        </button>

        <button
          :class="{ active: type==='tv' }"
          @click="cambiarTipo('tv')"
        >
          📺 Series
        </button>

      </div>

    </div>

    <!-- ========= BUSCADOR ========= -->

    <div class="barra">

      <SearchBar @buscar="buscar"/>

      <GenreFilter
        :genres="genres"
        @filter="filtrar"
      />

    </div>

    <!-- ========= POPULARES ========= -->

    <h2 class="seccion">
      Populares
    </h2>

    <div class="movies-grid">

      <div
        v-for="movie in movies"
        :key="movie.id"
        class="movie-card"
        @click="verDetalle(movie.id,type)"
      >

        <div class="poster">

          <img
            :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path"
          >

          <div class="overlay">

            <button class="detail">

              Ver detalle

            </button>

          </div>

        </div>

        <div class="movie-info">

          <h3>

            {{ movie.title || movie.name }}

          </h3>

          <div class="extra">

            <span>

              ⭐ {{ movie.vote_average }}

            </span>

            <span>

              {{ (movie.release_date || movie.first_air_date)?.substring(0,4) }}

            </span>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import SearchBar from "../components/SearchBar.vue";
import GenreFilter from "../components/GenreFilter.vue";

import {
  getPopularMovies,
  getPopularSeries,
  searchMovies,
  searchSeries,
  getGenres,
  getMoviesByGenre,
  getSeriesByGenre
} from "../services/api";

const router = useRouter();

const movies = ref([]);
const featured = ref(null);
const genres = ref([]);
const type = ref("movie");
const searchText = ref("");

// 🔥 cargar contenido base
async function cargarContenido() {
  let data;

  if (type.value === "movie") {
    data = await getPopularMovies();
  } else {
    data = await getPopularSeries();
  }

  movies.value = data.results;

  // Elegir una película/serie al azar para el banner
  featured.value =
    movies.value[Math.floor(Math.random() * movies.value.length)];
}

// 🔥 cambiar tipo
function cambiarTipo(nuevoTipo) {
  type.value = nuevoTipo;

  if (searchText.value) {
    ejecutarBusqueda();
  } else {
    cargarContenido();
  }
}

// 🔥 búsqueda central
async function ejecutarBusqueda() {
  if (!searchText.value) {
    cargarContenido();
    return;
  }

  if (type.value === "movie") {
    movies.value = (await searchMovies(searchText.value)).results;
  } else {
    movies.value = (await searchSeries(searchText.value)).results;
  }
}

// 🔍 buscador
async function buscar(texto) {
  searchText.value = texto;

  if (!texto) {
    cargarContenido();
    return;
  }

  ejecutarBusqueda();
}

// 🎭 filtros
async function filtrar(id) {
  if (!id) {
    cargarContenido();
    return;
  }

  if (type.value === "movie") {
    movies.value = (await getMoviesByGenre(id)).results;
  } else {
    movies.value = (await getSeriesByGenre(id)).results;
  }
}

// 🎬 detalle
function verDetalle(id, tipo) {
  router.push(`/${tipo}/${id}`);
}

onMounted(async () => {
  cargarContenido();
  genres.value = (await getGenres()).genres;
});
</script>

<style scoped>

.home{
    min-height:100vh;
    background:#0f1117;
    color:white;
    padding-bottom:50px;
}

/* ========================= */
/* BANNER */
/* ========================= */

.banner{

height:520px;

background-size:cover;

background-position:center;

display:flex;

align-items:flex-end;

padding:60px;

border-radius:0 0 25px 25px;

margin-bottom:35px;

}

.banner-content{

width:600px;

}

.categoria{

background:#ff2d55;

padding:8px 16px;

border-radius:30px;

font-size:13px;

font-weight:bold;

display:inline-block;

margin-bottom:20px;

}

.banner h1{

font-size:65px;

margin:0;

font-weight:800;

}

.datos{

display:flex;

gap:20px;

margin:20px 0;

font-size:18px;

}

.overview{

line-height:1.7;

font-size:16px;

color:#ddd;

margin-bottom:25px;

max-width:650px;

display:-webkit-box;
-webkit-line-clamp:4;
-webkit-box-orient:vertical;
overflow:hidden;

}

.banner-buttons{

display:flex;

gap:15px;

}

.play{

background:#ff2d55;

color:white;

border:none;

padding:14px 30px;

border-radius:10px;

font-size:17px;

cursor:pointer;

transition:.3s;

font-weight:bold;

}

.play:hover{

transform:translateY(-3px);

background:#ff5377;

box-shadow:0 10px 30px rgba(255,45,85,.35);

}

/* ========================= */

.titulo{

display:flex;

justify-content:space-between;

align-items:center;

padding:0 35px;

margin-bottom:25px;

}

.titulo h2{

font-size:36px;

}

/* ========================= */

.tabs{

display:flex;

gap:10px;

}

.tabs button{

background:#1b1f2b;

color:white;

border:none;

padding:12px 22px;

border-radius:10px;

cursor:pointer;

transition:.25s;

font-size:15px;

}

.tabs button:hover{

background:#ff2d55;

}

.tabs button.active{

background:#ff2d55;

transform:scale(1.05);

}

/* ========================= */

.barra{

display:flex;

justify-content:space-between;

align-items:center;

gap:20px;

padding:0 35px;

margin-bottom:40px;

flex-wrap:wrap;

}

/* ========================= */

.seccion{

padding:0 35px;

margin-bottom:25px;

font-size:30px;

}

/* ========================= */

.movies-grid{

padding:0 35px;

display:grid;

grid-template-columns:repeat(auto-fill,minmax(230px,1fr));

gap:28px;

}

/* ========================= */

.movie-card{

background:#181c24;

border-radius:18px;

overflow:hidden;

cursor:pointer;

transition:.35s;

box-shadow:0 12px 30px rgba(0,0,0,.3);

}

.movie-card:hover{

transform:translateY(-10px);

box-shadow:0 25px 45px rgba(0,0,0,.55);

}

/* ========================= */

.poster{

position:relative;

}

.poster img{

width:100%;

height:340px;

object-fit:cover;

display:block;

}

/* ========================= */

.overlay{

position:absolute;

inset:0;

background:rgba(0,0,0,.75);

display:flex;

justify-content:center;

align-items:center;

opacity:0;

transition:.3s;

}

.movie-card:hover .overlay{

opacity:1;

}

/* ========================= */

.detail{

background:#ff2d55;

border:none;

padding:13px 26px;

color:white;

font-weight:bold;

border-radius:10px;

cursor:pointer;

font-size:15px;

}

/* ========================= */

.movie-info{

padding:18px;

}

.movie-info h3{

margin:0 0 12px;

font-size:18px;

height:48px;

overflow:hidden;

}

.extra{

display:flex;

justify-content:space-between;

color:#aaa;

font-size:14px;

}

/* ========================= */

@media(max-width:900px){

.banner{

height:420px;

padding:30px;

}

.banner h1{

font-size:42px;

}

.movies-grid{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:650px){

.banner{

height:360px;

}

.banner h1{

font-size:32px;

}

.movies-grid{

grid-template-columns:1fr;

}

.titulo{

flex-direction:column;

gap:20px;

align-items:flex-start;

}

.barra{

padding:0 20px;

}

.movies-grid{

padding:0 20px;

}

.seccion{

padding:0 20px;

}

}

</style>