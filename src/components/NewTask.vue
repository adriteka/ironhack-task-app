<template>
  <form @submit.prevent="handleSubmit()">
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
          <td><input v-model="formValues.title" type="text" id="title" /></td>
          <td>
            <select v-model="formValues.priority" id="priority">
              <option :value="taskPriorities.critical">Critical</option>
              <option :value="taskPriorities.opportunity" default>
                Opportunity
              </option>
              <option :value="taskPriorities.horizon">Horizon</option>
            </select>
          </td>
          <td>
            <input v-model="formValues.startDate" type="date" id="start-date" />
          </td>
          <td>
            <input v-model="formValues.dueDate" type="date" id="due-date" />
          </td>
          <td><button type="submit">Create</button></td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore, useTaskStore, taskPriorities } from "../stores";

const authStore = useAuthStore();
const taskStore = useTaskStore();

const formValues = ref({
  userId: authStore.userId,
  title: "",
  priority: taskPriorities.opportunity,
  // default value provided in YYYY-MM-DD format
  startDate: new Date().toISOString().split("T")[0],
  dueDate: null,
});

const handleSubmit = () => {
  // TODO - validate form
  console.log("handleSubmit formValues.value", formValues.value);
  taskStore.createTask(formValues.value);

  resetForm();
};

const resetForm = () => {
  formValues.value.title = "";
  formValues.value.priority = taskPriorities.opportunity;
  formValues.value.startDate = new Date().toISOString().split("T")[0];
  formValues.value.dueDate = null;

  // TODO - error reset

  // form.value.title.error = false;
  // form.value.priority.error = false;
  // form.value.startDate.error = false;
  // form.value.dueDate.error = false;
};
</script>

<style scoped></style>
