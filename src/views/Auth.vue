<template>
  <div class="container">
    <section class="box" id="auth">
      <router-view />
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
if (authStore.isAuth) router.push({ name: "home" });
</script>

<style scoped>
h1 {
  text-align: center;
}
#auth {
  max-width: 352px;
  margin-inline: auto;
}

section {
  padding-block: 2rem;
}
</style>
