<template>
  <section>
    <header
      class="is-flex is-justify-content-space-between is-align-items-center"
    >
      <h3 class="title is-5 tasklist-title"><slot></slot></h3>
      <p>{{ qtyTasks }}</p>
    </header>
    <div
      class="columns is-variable is-2 is-size-7-5 is-uppercase has-text-weight-semibold"
    >
      <p class="column is-5 pt-2">Task</p>
      <p class="column is-2 pt-2">Start date</p>
      <p class="column is-2 pt-2">Due date</p>
      <p class="column pt-2">Actions</p>
    </div>
    <Task v-for="t in props.tasks" :id="t.id" :key="t.id" />
  </section>
</template>

<script setup>
import { defineProps, computed } from "vue";
import Task from "../components/Task.vue";
const props = defineProps(["tasks"]);

const qtyTasks = computed(() => {
  const qty = props.tasks.length;
  if (!qty) return "";
  else if (qty === 1) return "1 task";
  else return `${qty} tasks`;
});
</script>

<style scoped>
.tasklist-title {
  margin-bottom: 0;
}

.tasklist-heading > p {
  text-transform: uppercase;
}

header {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  padding-bottom: 0.75rem;
  border-bottom: 2px solid black;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

header p {
  color: gray;
}
</style>
