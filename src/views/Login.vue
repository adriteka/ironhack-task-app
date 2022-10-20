<template>
  <h3>Log In</h3>
  <form @submit.prevent="onSubmit()">
    <label for="email">E-mail</label>
    <input v-model="form.email.value" type="email" id="email" />
    <label for="password">Password</label>
    <input v-model="form.password.value" type="password" id="password" />
    <button type="submit">Log in!</button>
  </form>
  <p>
    Not registered yet?
    <router-link :to="{ name: 'signup' }">Sign up!</router-link>
  </p>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const form = ref({
  email: {
    value: "",
    error: false,
  },
  password: {
    value: "",
    error: false,
  },
});

const onSubmit = async () => {
  try {
    await authStore.logIn("abcn007@gmail.com", "123456");
    // await authStore.logIn(form.value.email.value, form.value.password.value);
    router.push({ name: "home" });
  } catch (e) {
    console.log("on submit login:", e);
  }
};
</script>

<style scoped></style>
