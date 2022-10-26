<template>
  <nav class="tabs is-right is-size-7">
    <ul id="today" class="is-size-6-5 has-text-weight-semibold has-text-grey">
      <li>{{ formattedDate }}</li>
    </ul>
    <ul>
      <li :class="{ 'is-active': routeName === 'current' }">
        <span
          v-if="taskStore.taskBeingEdited && routeName !== 'current'"
          class="has-text-grey-light pl-3 pr-3"
          >Current tasks</span
        >
        <router-link v-else :to="{ name: 'current' }">
          Current Tasks</router-link
        >
      </li>
      <li :class="{ 'is-active': routeName === 'future' }">
        <span
          v-if="taskStore.taskBeingEdited && routeName !== 'future'"
          class="has-text-grey-light pl-3 pr-3"
          >Future Tasks</span
        >
        <router-link v-else :to="{ name: 'future' }">Future Tasks</router-link>
      </li>
      <li :class="{ 'is-active': routeName === 'archived' }">
        <span
          v-if="taskStore.taskBeingEdited && routeName !== 'archived'"
          class="has-text-grey-light pl-3 pr-3"
          >Archived</span
        >
        <router-link v-else :to="{ name: 'archived' }">Archived</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useTaskStore } from "../stores";
const taskStore = useTaskStore();
const route = useRoute();
const routeName = ref(route.name);

const dateOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};
const formattedDate = new Date().toLocaleString("en-US", dateOptions);

watch(
  () => route.name,
  (newValue) => {
    routeName.value = newValue;
    console.log("watch routeName", routeName.value);
  }
);
</script>

<style scoped>
#today {
  justify-content: flex-start;
}
</style>
