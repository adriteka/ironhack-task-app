<template>
  <TaskList :tasks="tasksArchived">Archived Completed Tasks</TaskList>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTaskStore } from "../stores";
import TaskList from "../components/TaskList.vue";
const taskStore = useTaskStore();

// const taskSortDesc = (a, b) => {
//   if (a.startDate < b.startDate) return -1;
//   else if (a.startDate > b.startDate) return 1;
//   else if (a.refreshedAt < b.refreshedAt) return -1;
//   else if (a.refreshedAt > b.refreshedAt) return 1;
//   else return 0;
// };

// CHANGE SORT ORDER so completion_date, and refreshed_At first

const taskSort = (a, b) => {
  if (a.completedAt < b.completedAt) return 1;
  else return -1;
};

const tasksArchived = computed(() => {
  return taskStore.tasks
    .filter((t) => t.isArchived)
    .sort((a, b) => {
      return taskSort(a, b);
    });
});

onMounted(async () => {
  // if (!taskStore.tasks)
  await taskStore.getAllTasks();
});
</script>

<style scoped></style>
