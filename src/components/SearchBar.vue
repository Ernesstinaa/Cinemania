<template>
  <div class="search">
    <input
      v-model="text"
      type="text"
      placeholder="Buscar películas o series..."
      @keyup.enter="emitSearch"
    />

    <button @click="emitSearch">
      Buscar
    </button>

    <button v-if="text" @click="clear">✖</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["buscar"]);

const text = ref("");

// 🔥 enviar búsqueda
function emitSearch() {
  emit("buscar", text.value.trim());
}

// 🔥 limpiar
function clear() {
  text.value = "";
  emit("buscar", "");
}
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  background: #1a1a1a;
  padding: 8px 12px;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  gap: 8px;
}

.search input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
}

.search button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>