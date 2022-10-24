<template>
  <div class="container">
    <section class="box" id="auth">
      <router-view />
    </section>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
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
