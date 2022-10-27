<template>
  <footer class="web-footer">
    <p class="is-size-7 has-text-grey">
      <img src="../assets/1mtd-logo-small.png" alt="1MTD List Manager logo" />
      <b>1MTD List Manager</b>
      is the result of a 10-day project for a front-end web development bootcamp
      on October 2022.
      <router-link :to="{ name: 'about' }">Learn more about it</router-link>
    </p>
  </footer>
</template>

<script setup></script>

<style scoped>
footer {
  margin-block: 3rem;
  margin-inline: auto;
}

p {
  text-align: center;
  margin-inline: auto;
  max-width: 60ch;
  line-height: 1.8;
}

img {
  vertical-align: middle;
  position: relative;
  top: -2px;
  padding-right: 2px;
}

a {
  text-decoration: underline;
}
</style>
