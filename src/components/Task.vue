<template>
  <section>
    <form @submit.prevent="handleSubmit()">
      <div>{{ task.id }}</div>
      <input
        v-model="formValues.isCompleted"
        @change="handleCompleted()"
        type="checkbox"
        id=""
      />
      <!-- @dblclick="toggleFieldSet(t.id)" -->
      <fieldset disabled :id="'fieldset-' + id">
        <input v-model="formValues.title" type="text" id="" />
        <select v-model="formValues.priority" id="">
          <option :value="taskPriorities.critical">Critical</option>
          <option :value="taskPriorities.opportunity" default>
            Opportunity
          </option>
          <option :value="taskPriorities.horizon" default>Horizon</option>
        </select>
        <input v-model="formValues.startDate" type="date" id="" />
        <input v-model="formValues.dueDate" type="date" id="" />
      </fieldset>
    </form>
    <div class="actions">
      <button @click="handleEdit()">Edit</button>
      <button @click="handleDelete()">Delete</button>
      <button @click="handleRefresh()">Refresh</button>
      <button @click="handleDefer()">Defer</button>
      <button
        @click="
          handlePriorityChange(
            task.priority === taskPriorities.horizon
              ? taskPriorities.opportunity
              : taskPriorities.critical
          )
        "
      >
        ▲
      </button>
      <button
        @click="
          handlePriorityChange(
            task.priority === taskPriorities.critical
              ? taskPriorities.opportunity
              : taskPriorities.horizon
          )
        "
      >
        ▼
      </button>
    </div>
  </section>
</template>

<script setup>
import { useTaskStore, taskPriorities } from "../stores";
import { defineProps, onMounted, ref } from "vue";
const taskStore = useTaskStore();
const props = defineProps(["id"]);
const task = taskStore.getTask(props.id);
// console.log("Task setup", task);
let fieldSet;

const formValues = ref({
  isCompleted: task.isCompleted,
  title: task.title,
  priority: task.priority,
  startDate: task.startDate,
  dueDate: task.dueDate,
});

const handleCompleted = () => {
  const fieldValues = {
    isCompleted: form.value.isCompleted,
    completedAt: formValues.value.isCompleted ? Date.now() : null,
  };
  taskStore.modifyTask(task, fieldValues);
};

const handleEdit = () => {
  toggleActions();
};

const handleSubmit = () => {
  if (!formValues.value.dueDate) formValues.value.dueDate = null;
  if (task.priority !== formValues.priority)
    formValues.refreshedAt = Date.now();
  taskStore.modifyTask(task, formValues.value);
  toggleActions();
};

const handleDelete = () => {
  console.log("handleDelete", task);
  const accept = confirm(`Delete '${task.title.slice(0, 15)}' for sure?`);
  if (accept) taskStore.removeTask(task);
};

const handleRefresh = () => {
  const fieldValues = {
    startDate: new Date().toISOString().split("T")[0],
    refreshedAt: Date.now(),
  };
  console.log("handleRefresh", fieldValues.refreshedAt);
  taskStore.modifyTask(task, fieldValues);
  formValues.value.startDate = fieldValues.startDate;
};

const handleDefer = () => {
  const date = new Date(task.startDate);
  let day;

  // If Horizon: defer until next Sunday
  // Else: defer until the day after startDate
  if (task.priority === taskPriorities.horizon)
    day = date.getDate() - date.getDay() + 7;
  else day = date.getDate() + 1;

  const fieldValues = {
    startDate: new Date(date.setDate(day)).toISOString().split("T")[0],
    refreshedAt: Date.now(),
  };

  taskStore.modifyTask(task, fieldValues);
  formValues.value.startDate = fieldValues.startDate;
};

const handlePriorityChange = (newPriority) => {
  const fieldValues = {
    priority: newPriority,
    startDate: new Date().toISOString().split("T")[0],
    refreshedAt: Date.now(),
  };
  taskStore.modifyTask(task, fieldValues);
};

const handleSave = () => {
  // TODO - Validate fields = handleSubmit()
  taskStore.modifyTask(task, formValues.value);
};

const toggleActions = () => {
  fieldSet.disabled = !fieldSet.disabled;
  // TODO - estilo dinámico
  // 1. hide/disable checkbox
  // 2. hide edit/trash/1mtd
  // 3. show save/undo
};

onMounted(() => {
  fieldSet = document.getElementById("fieldset-" + task.id);
});
</script>

<style scoped>
section,
form,
fieldset,
.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

fieldset {
  background-color: aquamarine;
}

.actions {
  background-color: lightgoldenrodyellow;
}
</style>
