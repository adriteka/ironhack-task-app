<template>
  <h3>Sign Up</h3>
  <form @submit.prevent="onSubmit()">
    <label for="email">E-mail</label>
    <input v-model="form.email.value" type="email" id="email" />
    <label for="password">Password</label>
    <input v-model="form.password.value" type="password" id="password" />
    <label for="password-repeat">Repeat password</label>
    <input
      v-model="form.passwordRepeat.value"
      type="password"
      id="password-repeat"
    />
    <button type="submit">Sign up!</button>
  </form>
  <p>
    Already have an account?
    <router-link :to="{ name: 'login' }">Log in!</router-link>
  </p>
</template>

<script setup>
import { ref } from "vue";
import { signUp } from "../api/supabase.js";
const form = ref({
  email: {
    value: "",
    error: false,
  },
  password: {
    value: "",
    error: false,
  },
  passwordRepeat: {
    value: "",
    error: false,
  },
});

const onSubmit = async () => {
  await signUp(form.value.email.value, form.value.password.value);
};
</script>

<style scoped></style>
