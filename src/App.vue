<template>
  <header class="container">
    <NavBar />
  </header>
  <main class="is-size-6-5">
    <router-view />
  </main>
  <Footer v-if="authStore.isAuth" />
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { useAuthStore } from "./stores";

const authStore = useAuthStore();
authStore.checkDarkMode();
</script>

<style scoped></style>
