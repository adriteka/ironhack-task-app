<template>

    <div>
      <TaskList :tasks="tasksCritical">Critical</TaskList>
      <TaskList :tasks="tasksOpportunity">Opportunity</TaskList>
      <TaskList :tasks="tasksHorizon">Horizon</TaskList>
    </div>

</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTaskStore, taskPriorities } from "../stores";
import TaskList from "../components/TaskList.vue";
const taskStore = useTaskStore();

const taskSortDesc = (a, b) => {
  if (a.startDate < b.startDate) return 1;
  else if (a.startDate > b.startDate) return -1;
  else if (a.refreshedAt < b.refreshedAt) return 1;
  else if (a.refreshedAt > b.refreshedAt) return -1;
  else return 0;
};

const taskSortAsc = (a, b) => {
  if (a.startDate < b.startDate) return -1;
  else if (a.startDate > b.startDate) return 1;
  else if (a.refreshedAt < b.refreshedAt) return 1;
  else if (a.refreshedAt > b.refreshedAt) return -1;
  else return 0;
};

const tasksCritical = computed(() => {
  return taskStore.tasks
    .filter((t) => t.priority === taskPriorities.critical && !t.isArchived)
    .sort((a, b) => {
      return taskSortDesc(a, b);
    });
});

const tasksOpportunity = computed(() => {
  return taskStore.tasks
    .filter(
      (t) =>
        t.priority === taskPriorities.opportunity &&
        !t.isArchived &&
        new Date(t.startDate) <= Date.now()
    )
    .sort((a, b) => {
      return taskSortDesc(a, b);
    });
});

const tasksHorizon = computed(() => {
  return taskStore.tasks
    .filter(
      (t) =>
        t.priority === taskPriorities.horizon &&
        !t.isArchived &&
        new Date(t.startDate) <= Date.now()
    )
    .sort((a, b) => {
      return taskSortDesc(a, b);
    });
});

const tasksOpportunityPostponed = computed(() => {
  return taskStore.tasks
    .filter(
      (t) =>
        t.priority === taskPriorities.opportunity &&
        new Date(t.startDate) > Date.now()
    )
    .sort((a, b) => {
      return taskSortAsc(a, b);
    });
});

const tasksHorizonPostponed = computed(() => {
  return taskStore.tasks
    .filter(
      (t) =>
        t.priority === taskPriorities.horizon &&
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
