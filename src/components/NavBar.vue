<template>
  <nav
    :class="{
      'is-justify-content-space-between': authStore.isAuth,
      'is-justify-content-center': !authStore.isAuth,
    }"
  >
    <div>
      <img src="../assets/1mtd-logo.png" />
      <h1 class="title is-5">1MTD List Manager</h1>
    </div>
    <div v-if="authStore.isAuth">
      <p class="has-text-grey">{{ authStore.email }}</p>
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
  await authStore.fueralogOut();
  if (!authStore.isAuth) router.push({ name: "auth" });
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: 1rem;
}

nav > div {
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
}

nav > div:first-child {
  gap: 0.5rem;
}

nav > div:last-child {
  gap: 1rem;
}

.logout {
  height: 1.5rem;
}
</style>
