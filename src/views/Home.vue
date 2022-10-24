<template>
  <div v-if="authStore.isAuth" class="container">
    <NewTask />
    <section class="box">
      <NavBarTasks />
      <router-view />
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";
import NewTask from "../components/NewTask.vue";
import NavBarTasks from "../components/NavBarTasks.vue";

const router = useRouter();
const authStore = useAuthStore();

if (!authStore.isAuth) router.push({ name: "login", params: { signup: 0 } });
</script>

<style scoped></style>
