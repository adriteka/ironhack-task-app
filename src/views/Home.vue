<template>
  <h2>Home</h2>
  <NewTask />
  <TaskList v-if="authStore.isAuth" />
</template>

<script setup>
import { useAuthStore } from "../stores";
import { useRouter } from "vue-router";
import NewTask from "../components/NewTask.vue";
import TaskList from "../components/TaskList.vue";

const router = useRouter();
const authStore = useAuthStore();
if (!authStore.isAuth) router.push({ name: "login" });
</script>

<style scoped></style>
