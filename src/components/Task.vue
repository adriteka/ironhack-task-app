<template>
  <form @submit.prevent="onSubmit(t)">
    <div>{{ t.id }}</div>
    <input
      v-model="t.isCompleted"
      @change="onCompletedClick(t)"
      type="checkbox"
      id=""
    />
    <fieldset disabled :id="'fieldset-' + id">
      <input v-model="form.title" type="text" id="" />
      <select v-model="form.priority" id="">
        <option value="3">Critical</option>
        <option value="2">Opportunity</option>
        <option value="1">Horizon</option>
      </select>
      <input v-model="t.startDate" type="date" id="" />
      <input v-model="t.dueDate" type="date" id="" />
    </fieldset>
    <div>
      <button @click="handleEditClick()">Edit</button>
      <button @click="onDeleteClick(t)">Delete</button>
      <button @click="onDeferClick(t.id)">Defer</button>
    </div>
  </form>
</template>

<script setup>
import { useTaskStore, taskPriorities } from "../stores";
import { defineProps, ref } from "vue";
const taskStore = useTaskStore();
const props = defineProps(["id"]);
const task = taskStore.getTask(props.value.id);
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
const fieldSet = document.getElementById("fieldset-" + id);
const originalTask = {};
const handleEditClick = () => {
  fieldset.disabled = false;
  originalTask = { ...task };
  // TODO - estilo dinámico
};
</script>

<style scoped></style>
