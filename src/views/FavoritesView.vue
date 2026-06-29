<template>
  <div class="favorites">
    <h1>Mis Favoritos ❤️</h1>

    <div v-if="favorites.length === 0">
      No tenés ningun favorito.
    </div>

    <div class="grid">
      <div v-for="movie in favorites" :key="movie.id" class="card">
        <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" />

        <h3>{{ movie.title }}</h3>

        <button @click="removeFavorite(movie.id)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: []
    };
  },
  mounted() {
    this.loadFavorites();
  },
  methods: {
    loadFavorites() {
      this.favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter(m => m.id !== id);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  }
};
</script>

<style scoped>
.favorites {
  padding: 20px;
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  gap: 20px;
  justify-content: center;
}

/* CARD FIJA */
.card {
  width: 180px;
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  transition: 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

/* IMAGEN */
.card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.card:hover {
  transform: scale(1.06);
  z-index: 2;
}

.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  border: none;
  color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
}
</style>