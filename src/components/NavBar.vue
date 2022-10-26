<template>
  <nav
    id="main-nav"
    :class="{
      'is-justify-content-space-between': authStore.isAuth,
      'is-justify-content-center': !authStore.isAuth,
    }"
  >
    <router-link :to="{ name: 'home' }">
      <div class="left">
        <img src="../assets/1mtd-logo.png" />
        <h1 class="title is-5">1MTD List Manager</h1>
      </div>
    </router-link>
    <div v-if="authStore.isAuth" class="right">
      <p class="has-text-grey">{{ authStore.email }}</p>
      <font-awesome-icon
        @click="authStore.toggleDarkMode()"
        icon="fa-solid fa-circle-half-stroke"
        title="Toggle Dark Mode"
        class="logout cursor-pointer has-text-grey"
      />
      <span class="is-size-7-5 has-text-grey-light">●</span>
      <font-awesome-icon
        @click="handleLogOut()"
        icon="fa-solid fa-right-from-bracket"
        title="Log Out"
        class="logout cursor-pointer has-text-grey"
      />
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogOut = async () => {
  await authStore.logOut();
  if (!authStore.isAuth) router.push({ name: "auth" });
};

authStore.checkDarkMode();
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: 1rem;
}

.left,
.right {
  display: flex;
  align-items: center;
}

.left {
  gap: 0.5rem;
}

.right {
  gap: 1rem;
}

.logout {
  height: 1.5rem;
}
</style>
