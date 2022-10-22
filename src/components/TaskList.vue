<template>
  <section>
    <section v-if="tasksCritical.length">
      <header>
        <h3>Critical tasks</h3>
        <div>Id</div>
        <div>Done</div>
        <div>Action</div>
        <div>Priority</div>
        <div>Start Date</div>
        <div>Due Date</div>
        <div>Actions</div>
      </header>
      <Task v-for="t in tasksCritical" :id="t.id" :key="t.id" />
    </section>
    <section>
      <header>
        <h3>Opportunity tasks</h3>
        <div>Id</div>
        <div>Done</div>
        <div>Action</div>
        <div>Priority</div>
        <div>Start Date</div>
        <div>Due Date</div>
        <div>Actions</div>
      </header>
      <Task v-for="t in tasksOpportunity" :id="t.id" :key="t.id" />
    </section>
    <section>
      <header>
        <h3>Horizon tasks</h3>
        <div>Id</div>
        <div>Done</div>
        <div>Task</div>
        <div>Priority</div>
        <div>Start Date</div>
        <div>Due Date</div>
        <div>Actions</div>
      </header>
      <Task v-for="t in tasksHorizon" :id="t.id" :key="t.id" />
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTaskStore, taskPriorities } from "../stores";
import Task from "./Task.vue";
const taskStore = useTaskStore();

const taskSort = (a, b) => {
  if (a.startDate < b.startDate) return 1;
  else if (a.startDate > b.startDate) return -1;
  else if (a.refreshedAt < b.refreshedAt) return 1;
  else if (a.refreshedAt > b.refreshedAt) return -1;
  else return 0;
};

const tasksCritical = computed(() => {
  console.log("computed critical");

  return taskStore.tasks
    .filter((t) => t.priority === taskPriorities.critical)
    .sort((a, b) => {
      return taskSort(a, b);
    });
});
const tasksOpportunity = computed(() => {
  console.log("computed opportunity");
  return taskStore.tasks
    .filter((t) => t.priority === taskPriorities.opportunity)
    .sort((a, b) => {
      return taskSort(a, b);
    });
});
const tasksHorizon = computed(() => {
  console.log("computed horizon");
  return taskStore.tasks
    .filter((t) => t.priority === taskPriorities.horizon)
    .sort((a, b) => {
      return taskSort(a, b);
    });
});

onMounted(async () => {
  // if (!taskStore.tasks)
  await taskStore.getAllTasks();
});
</script>

<style scoped>
header {
  display: flex;
  gap: 1rem;
}
</style>
