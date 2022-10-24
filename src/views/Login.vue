<template>
  <h3 class="title is-5">Log In</h3>
  <form @submit.prevent="handleSubmit()">
    <div class="field">
      <label for="email" class="label is-size-7-5 is-uppercase">E-mail</label>
      <p class="control has-icons-left">
        <!-- v-on:focusout="checkEmail()" -->
        <input
          v-model="form.email.value"
          ref="inputEmail"
          type="text"
          id="email"
          placeholder="Enter your e-mail"
          class="input"
          :class="{ 'is-danger': form.email.error }"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon icon="fa-solid fa-envelope" />
        </span>
      </p>
      <p class="help is-danger">{{ form.email.error }}</p>
    </div>
    <div class="field">
      <label for="password" class="label is-size-7-5 is-uppercase"
        >Password</label
      >
      <p class="control has-icons-left">
        <!-- v-on:focusout="checkPassword()" -->
        <input
          v-model="form.password.value"
          ref="inputPassword"
          type="password"
          id="password"
          placeholder="● ● ● ● ● ●"
          class="input"
          :class="{ 'is-danger': form.password.error }"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon icon="fa-solid fa-lock" />
        </span>
      </p>
      <p class="help is-danger">{{ form.password.error }}</p>
    </div>
    <div class="field is-center">
      <button type="submit" class="button mt-4">Log in</button>
    </div>
  </form>
  <div class="alternative has-text-grey">
    <p>
      Not registered yet?
      <router-link :to="{ name: 'signup' }">Sign up</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  email: {
    value: "",
    error: null,
  },
  password: {
    value: "",
    error: null,
  },
});

const inputEmail = ref(null);
const inputPassword = ref(null);

const checkEmail = () => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  if (!regex.test(form.value.email.value)) {
    form.value.email.error = "E-mail should look like 'name@domain.com'";
    return false;
  }
  form.value.email.error = null;
  return true;
};

const checkPassword = () => {
  if (form.value.password.value.length < 6) {
    form.value.password.error = "Password should be at least 6 characters";
    return false;
  }
  form.value.password.error = null;
  return true;
};

const handleSubmit = async () => {
  if (!checkEmail()) {
    inputEmail.value.focus();
    return;
  }
  if (!checkPassword()) {
    inputPassword.value.focus();
    return;
  }

  // throw-try-catch, e.g.
  // invalid credentials
  await authStore.logIn(form.value.email.value, form.value.password.value);
  if (authStore.isAuth) router.push({ name: "home" });
};

onMounted(() => {
  inputEmail.value.focus();
});
</script>

<style scoped>
h3 {
  padding-bottom: 0.75rem;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
}

a {
  text-decoration: underline;
}

.is-center {
  display: flex;
  justify-content: center;
}

.alternative {
  padding-top: 0.75rem;
  border-top: 1px solid gray;
  margin-top: 2rem;
  text-align: center;
}

.help {
  height: 18px;
}
</style>
