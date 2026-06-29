<template>
  <nav class="navbar">
    <h2>🎬 MovieApp</h2>

    <div class="links">
      <router-link to="/">Inicio</router-link>
      <router-link to="/favorites">Favoritos ❤️</router-link>
    </div>
  </nav>
</template>

<style scoped>
/* CARD BASE */
.movie-card {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
}

.movie-card:hover {
  transform: scale(1.06);
  z-index: 2;
}

/* IMAGEN */
.image-wrapper {
  position: relative;
  overflow: hidden;
}

.movie-card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: 0.3s;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);

  display: flex;
  flex-direction: column;
  gap: 10px;

  justify-content: center;
  align-items: center;

  opacity: 0;
  transition: 0.3s;
}

.image-wrapper:hover .overlay {
  opacity: 1;
}

/* BOTONES */
.overlay button {
  background: red;
  border: none;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 130px;
  transition: 0.2s;
}

.overlay button:hover {
  transform: scale(1.05);
}

/* INFO */
.movie-info {
  padding: 10px;
}

.movie-info h3 {
  font-size: 14px;
  margin: 0;
}

.movie-info p {
  font-size: 12px;
  margin: 4px 0;
  opacity: 0.8;
}
</style>