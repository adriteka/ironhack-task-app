<template>
  <div class="tabs is-right is-size-7">
    <ul>
      <li :class="{ 'is-active': routeName === 'current' }">
        <router-link :to="{ name: 'current' }"> Current tasks</router-link>
      </li>
      <li :class="{ 'is-active': routeName === 'future' }">
        <router-link :to="{ name: 'future' }">Future tasks</router-link>
      </li>
      <li><a>Completed</a></li>
      <li><a>Trashed</a></li>
      <li><a>Archived</a></li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();
const routeName = ref(route.name);

watch(
  () => route.name,
  (newValue) => {
    routeName.value = newValue;
    console.log("watch routeName", routeName.value);
  }
);
</script>

<style scoped></style>
