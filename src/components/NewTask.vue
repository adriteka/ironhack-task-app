<template>
  <form @submit.prevent="onSubmit()">
    <table>
      <thead>
        <tr>
          <th><label for="is-completed">Completed</label></th>
          <th><label for="title">New Task</label></th>
          <th><label for="priority">Urgency</label></th>
          <th><label for="start-date">Start Date</label></th>
          <th><label for="due-date">Due Date</label></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input
              v-model="form.isCompleted.value"
              type="checkbox"
              id="is-completed"
            />
          </td>
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
  isCompleted: {
    value: false,
    error: false,
  },
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
});

const onSubmit = () => {
  console.log("onSubmit", form.value);
  const newTask = {
    id: undefined,
    userId: authStore.userId,
    title: form.value.title.value,
    priority: form.value.priority.value,
    startDate: form.value.startDate.value,
    dueDate: form.value.dueDate.value ? form.value.dueDate.value : null,
    completedAt: null,
    refreshedAt: new Date(),
    isCompleted: form.value.isCompleted.value,
    isArchived: false,
  };

  try {
    taskStore.createTask(newTask);
    resetForm();
  } catch (e) {
    console.log("newTask error", e);
  }
};

const resetForm = () => {
  form.value.title.value = "";
  form.value.title.error = false;
  form.value.startDate.value = new Date().toISOString().split("T")[0];
  form.value.startDate.error = false;
  form.value.dueDate.value = null;
  form.value.dueDate.error = false;
  form.value.priority.value = "2";
  form.value.priority.error = false;
};
</script>

<style scoped></style>
