<template>
  <header>
    <nav>
      <ul>
        <li><router-link :to="{ name: 'home' }">Home</router-link></li>
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Task App</h1>
    <router-view></router-view>
  </main>
</template>

<script setup>
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
</script>

<style scoped>
ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
}
</style>
