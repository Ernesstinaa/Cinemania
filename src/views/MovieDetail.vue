<template>
  <div
    v-if="movie"
    class="detail"
    :style="{
      backgroundImage:
        'linear-gradient(rgba(0,0,0,.82), rgba(0,0,0,.95)), url(https://image.tmdb.org/t/p/original' +
        movie.backdrop_path +
        ')'
    }"
  >
    <img
      class="poster"
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      :alt="movie.title || movie.name"
    />

    <div class="info">

      <h1>{{ movie.title || movie.name }}</h1>

      <div class="stats">
        <span>⭐ {{ movie.vote_average }}</span>

        <span>
          📅 {{ movie.release_date || movie.first_air_date }}
        </span>

        <span>🌎 {{ movie.original_language.toUpperCase() }}</span>
      </div>

      <div class="genres" v-if="movie.genres">
        <span
          v-for="g in movie.genres"
          :key="g.id"
          class="genre"
        >
          {{ g.name }}
        </span>
      </div>

      <p class="overview">
        {{ movie.overview }}
      </p>

      <div class="extra">

        <p>🔥 Popularidad: {{ movie.popularity }}</p>

        <p>🗳️ Votos: {{ movie.vote_count }}</p>

        <p v-if="movie.runtime">
          ⏱️ Duración: {{ movie.runtime }} min
        </p>

        <p v-if="movie.number_of_seasons">
          📺 Temporadas: {{ movie.number_of_seasons }}
        </p>

      </div>

      <div class="buttons">

        <button class="fav" @click="toggleFavorite">
          {{ isFavorite ? "💔 Quitar de favoritos" : "❤️ Agregar a favoritos" }}
        </button>

        <button class="back" @click="$router.back()">
          ⬅ Volver
        </button>

      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movie: null,
      isFavorite: false,
      apiKey: "b1f162d2d371f75c9aad0f6faec3fe1e"
    };
  },

  async mounted() {

    const id = this.$route.params.id;

    const type = this.$route.path.includes("/tv/")
      ? "tv"
      : "movie";

    const res = await axios.get(

      `https://api.themoviedb.org/3/${type}/${id}?api_key=${this.apiKey}&language=es-ES`

    );

    this.movie = res.data;

    const favs =
      JSON.parse(localStorage.getItem("favorites")) || [];

    this.isFavorite =
      favs.some(f => f.id === this.movie.id);

  },

  methods: {

    toggleFavorite(){

      let favs =
        JSON.parse(localStorage.getItem("favorites")) || [];

      if(this.isFavorite){

        favs = favs.filter(f=>f.id!==this.movie.id);

      }else{

        favs.push(this.movie);

      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(favs)
      );

      this.isFavorite = !this.isFavorite;

    }

  }

};
</script>

<style scoped>

.detail{

min-height:100vh;

display:flex;

gap:60px;

padding:60px;

background-size:cover;

background-position:center;

color:white;

align-items:flex-start;

}

.poster{

width:330px;

border-radius:18px;

box-shadow:0 20px 50px rgba(0,0,0,.6);

}

.info{

max-width:700px;

}

.info h1{

font-size:52px;

margin-bottom:20px;

}

.stats{

display:flex;

gap:25px;

margin-bottom:20px;

font-size:18px;

}

.genres{

margin-bottom:25px;

}

.genre{

display:inline-block;

background:#ff2d55;

padding:6px 14px;

border-radius:30px;

margin-right:8px;

margin-bottom:8px;

font-size:14px;

}

.overview{

font-size:18px;

line-height:1.8;

margin-bottom:25px;

color:#ddd;

}

.extra{

background:rgba(255,255,255,.08);

padding:20px;

border-radius:15px;

margin-bottom:30px;

backdrop-filter:blur(8px);

}

.extra p{

margin:10px 0;

}

.buttons{

display:flex;

gap:15px;

flex-wrap:wrap;

}

button{

border:none;

padding:14px 22px;

border-radius:10px;

cursor:pointer;

font-size:16px;

transition:.3s;

font-weight:bold;

}

.fav{

background:#ff2d55;

color:white;

}

.back{

background:#222;

color:white;

}

button:hover{

transform:translateY(-3px);

}

@media(max-width:900px){

.detail{

flex-direction:column;

align-items:center;

padding:30px;

}

.poster{

width:260px;

}

.info{

text-align:center;

}

.stats{

justify-content:center;

flex-wrap:wrap;

}

.buttons{

justify-content:center;

}

.info h1{

font-size:36px;

}

}

</style>