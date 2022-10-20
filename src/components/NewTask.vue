<template>
  <form @submit.prevent="onSubmit()">
    <table>
      <thead>
        <tr>
          <th><label for="title">New Task</label></th>
          <th><label for="priority">Urgency</label></th>
          <th><label for="start-date">Start Date</label></th>
          <th><label for="due-date">Due Date</label></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input v-model="form.title.value" type="text" id="title" /></td>
          <td>
            <select v-model="form.priority.value" id="priority">
              <option value="3">Critical</option>
              <option value="2" default>Opportunity</option>
              <option value="1">Horizon</option>
            </select>
          </td>
          <td>
            <input v-model="form.startDate.value" type="date" id="start-date" />
          </td>
          <td>
            <input v-model="form.dueDate.value" type="date" id="due-date" />
          </td>
          <td><button type="submit">Create</button></td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore, useTaskStore } from "../stores";

const authStore = useAuthStore();
const taskStore = useTaskStore();

const form = ref({
  title: {
    value: "",
    error: false,
  },
  startDate: {
    // default value provided in YYYY-MM-DD format
    value: new Date().toISOString().split("T")[0],
    error: false,
  },
  dueDate: {
    value: null,
    error: false,
  },
  priority: {
    value: 2,
    error: false,
  },
  isComplete: {
    value: false,
    error: false,
  },
});

const onSubmit = () => {
  const newTask = {
    id: undefined,
    userId: authStore.userId,
    title: form.value.title.value,
    priority: form.value.priority.value,
    startDate: form.value.startDate.value,
    dueDate: form.value.dueDate.value ? form.value.dueDate.value : null,
    completionDate: null,
    isComplete: false,
    isArchived: false,
  };

  try {
    taskStore.createTask(newTask);
  } catch (e) {
    console.log("newTask error", e);
  }
};
</script>

<style scoped></style>
