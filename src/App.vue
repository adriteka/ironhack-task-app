<template>
  <div class="container">
    <NavBar />
  </div>
  <main class="is-size-6-5">
    <router-view />
  </main>
  <!-- footer -->
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<style scoped></style>
