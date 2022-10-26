<template>
  <div v-if="authStore.isAuth" class="container">
    <TaskNew />
    <section class="box">
      <NavBarTasks />
      <Transition name="slide-up" appear>
      <router-view />
      </Transition>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";
import TaskNew from "../components/TaskNew.vue";
import NavBarTasks from "../components/NavBarTasks.vue";
// import ModalTaskDelete from "../components/ModalTaskDelete.vue";

const router = useRouter();
const authStore = useAuthStore();

if (!authStore.isAuth) router.push({ name: "login", params: { signup: 0 } });
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(1.25rem);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-1.25rem);
}
</style>
