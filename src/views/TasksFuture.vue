<template>

    <div>
      <TaskList :tasks="tasksOpportunityFuture">Future Opportunity</TaskList>
      <TaskList :tasks="tasksHorizonFuture">Future Horizon</TaskList>
    </div>

</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTaskStore, taskPriorities } from "../stores";
import TaskList from "../components/TaskList.vue";
const taskStore = useTaskStore();

// const taskSortDesc = (a, b) => {
//   if (a.startDate < b.startDate) return -1;
//   else if (a.startDate > b.startDate) return 1;
//   else if (a.refreshedAt < b.refreshedAt) return -1;
//   else if (a.refreshedAt > b.refreshedAt) return 1;
//   else return 0;
// };

const taskSortAsc = (a, b) => {
  if (a.startDate < b.startDate) return -1;
  else if (a.startDate > b.startDate) return 1;
  else if (a.refreshedAt < b.refreshedAt) return 1;
  else if (a.refreshedAt > b.refreshedAt) return -1;
  else return 0;
};

const tasksOpportunityFuture = computed(() => {
  return taskStore.tasks
    .filter(
      (t) =>
        t.priority === taskPriorities.opportunity &&
        !t.isArchived &&
        new Date(t.startDate) > Date.now()
    )
    .sort((a, b) => {
      return taskSortAsc(a, b);
    });
});

const tasksHorizonFuture = computed(() => {
  return taskStore.tasks
    .filter(
      (t) =>
        t.priority === taskPriorities.horizon &&
        !t.isArchived &&
        new Date(t.startDate) > Date.now()
    )
    .sort((a, b) => {
      return taskSortAsc(a, b);
    });
});

onMounted(async () => {
  // if (!taskStore.tasks)
  await taskStore.getAllTasks();
});
</script>

<style scoped>

</style>
