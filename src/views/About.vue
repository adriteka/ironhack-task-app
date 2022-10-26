<template>
  <div v-if="authStore.isAuth" class="container">
    <section class="box">
      <nav class="tabs is-left is-size-7">
        <ul>
          <li :class="{ 'is-active': routeName === 'tasks' }">
 
            <router-link :to="{ name: 'tasks' }">
              Task Management</router-link
            >
          </li>
          <li :class="{ 'is-active': routeName === 'webdev' }">
            
            <router-link :to="{ name: 'webdev' }"
              >Web Development</router-link
            >
          </li>
        </ul>
      </nav>
      <Transition name="slide-up" appear>
        <router-view />
      </Transition>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores";

const route = useRoute();
const routeName = ref(route.name);
const router = useRouter();
const authStore = useAuthStore();

if (!authStore.isAuth) router.push({ name: "login" });

watch(
  () => route.name,
  (newValue) => {
    routeName.value = newValue;
  }
);

</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
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
