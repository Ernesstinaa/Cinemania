
<template>
<div
  class="movie-card"
  v-for="movie in movies"
  :key="movie.id"
>
  <div class="image-wrapper">
    <img
      :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
      :alt="movie.title"
    />

    <!-- OVERLAY PRO -->
    <div class="overlay">
      <button @click.stop="verDetalle(movie.id)">
        🎬 Ver detalle
      </button>

      <button @click.stop="agregarFavorito(movie)">
        ❤️ Favorito
      </button>
    </div>
  </div>

  <div class="movie-info">
    <h3>{{ movie.title }}</h3>
    <p>📅 {{ movie.release_date }}</p>
    <p>⭐ {{ movie.vote_average }}</p>
  </div>
</div>
</template>

<script setup>
defineProps({
  movie:Object
})
</script>

<style scoped>

.card{

background:#1e1e1e;
padding:15px;
border-radius:10px;
text-align:center;

}

img{

width:100%;
border-radius:10px;

}

h3{

font-size:18px;
min-height:55px;

}

a{

display:inline-block;
margin-top:10px;
padding:8px 15px;
background:#00bfff;
color:white;
text-decoration:none;
border-radius:6px;

}

</style>