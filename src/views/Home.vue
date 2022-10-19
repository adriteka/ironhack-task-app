<template>
  <h2>Home</h2>
</template>

<script setup>
import { useAuthStore } from "../stores";
import { useRouter } from "vue-router";
const router = useRouter();
if (!useAuthStore.isAuth)
  router.push({ name: "auth", params: { action: "login" } });
</script>

<style scoped></style>
