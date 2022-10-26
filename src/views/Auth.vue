<template>
  <Transition name="slide-up" appear>
  <div class="container">
      <section class="box" id="auth">
        <router-view />
      </section>
    </div>
  </Transition>
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50vh);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-50vh);
}

.slide-up-enter-active .box,
.slide-up-leave-active .box {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from .box {
  opacity: 0;
  transform: translateY(1.25rem);
}

.slide-up-leave-to .box {
  opacity: 0;
  transform: translateY(-1.25rem);
}
</style>
