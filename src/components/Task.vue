<template>
  <section>
    <!-- TODO toggleEdit en columna, no toda la row -->
    <!-- @dblclick="toggleEdit()" -->
    <!-- <div v-if="!isEdit" class="task-info" @dblclick="toggleEdit()"> -->

    <div v-if="!isEdit" class="columns is-variable is-2 mb-4 task">
      <p class="column is-5 pl-5">
        {{ task.title }}
      </p>

      <p class="column is-2">
        {{ taskStore.getFormattedDate(task.startDate) }}
      </p>
      <p class="column is-2">{{ taskStore.getFormattedDate(task.dueDate) }}</p>
      <div class="actions column">
        <input
          v-model="formValues.isCompleted"
          @change="handleCompleted()"
          type="checkbox"
          id="checkbox-done"
        />
        <!-- <button @click="handleEdit()" class="button"> -->
        <span class="icon is-normal" title="Edit the task">
          <i class="fa-regular fa-pen-to-square"></i>
        </span>
        <!-- </button> -->
        <button @click="handleDelete()">D</button>
        <button @click="handleRefresh()">Rf</button>
        <button @click="handlePostpone()">Df</button>
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
        <!-- <div>{{ task.id }}</div> -->
      </div>
    </div>
    <!-- <div v-else class="columns is-variable is-2 mb-4" > -->
    <form
      v-else
      class="columns is-variable is-2 mb-4"
      @submit.prevent="handleSave()"
    >
      <div class="field column is-3">
        <input
          v-model="formValues.title"
          type="text"
          id="title"
          ref="inputTitle"
          placeholder="What you intend to do"
          class="input is-size-6-5"
        />
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field column is-2">
        <div class="select">
          <select v-model="formValues.priority" id="priority">
            <option :value="taskPriorities.critical">Critical</option>
            <option :value="taskPriorities.opportunity" default>
              Opportunity
            </option>
            <option :value="taskPriorities.horizon">Horizon</option>
          </select>
        </div>
      </div>

      <div class="field column is-2">
        <input
          v-model="formValues.startDate"
          type="date"
          id="start-date"
          class="input is-size-6-5"
        />
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field column is-2">
        <input
          v-model="formValues.dueDate"
          type="date"
          id="due-date"
          class="input is-size-6-5"
        />
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field column actions">
        <button @click="handleSave()">Save</button>
        <button @click="handleUndo()">Undo</button>
      </div>
    </form>

    <!-- </div> -->
  </section>
</template>

<script setup>
import { useTaskStore, taskPriorities } from "../stores";
import { defineProps, onMounted, ref } from "vue";
const taskStore = useTaskStore();
const props = defineProps(["id"]);
const task = taskStore.getTask(props.id);
const isEdit = ref(false);
let checkboxDone;

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

const handleSave = () => {
  if (!formValues.value.dueDate) formValues.value.dueDate = null;
  if (task.priority !== formValues.priority)
    formValues.refreshedAt = Date.now();
  taskStore.modifyTask(task, formValues.value);
  toggleEdit();
};

const handleUndo = () => {
  // toggleEdit();
};

const handleEdit = () => {
  toggleEdit();
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

const handlePostpone = () => {
  const date = new Date(task.startDate);
  let day;

  // If Horizon: postpone until sunday after startDate
  // Else: postpone until day after startDate
  if (task.priority === taskPriorities.horizon)
    day = date.getDate() - date.getDay() + 7;
  else day = date.getDate() + 1;
  console.log("day", date.setDate(day));
  const fieldValues = {
    startDate: new Date(date.setDate(day)).toISOString().split("T")[0],
    refreshedAt: Date.now(),
  };

  taskStore.modifyTask(task, fieldValues);
};

const handlePriorityChange = (newPriority) => {
  const fieldValues = {
    priority: newPriority,
    startDate: new Date().toISOString().split("T")[0],
    refreshedAt: Date.now(),
  };
  taskStore.modifyTask(task, fieldValues);
};

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
  checkboxDone.disabled = !checkboxDone.disabled;
  if (isEdit.value) {
    formValues.value.isCompleted = task.isCompleted;
    formValues.value.title = task.title;
    formValues.value.priority = task.priority;
    formValues.value.startDate = task.startDate;
    formValues.value.dueDate = task.dueDate;
  }
  // TODO - estilo dinámico
  // 1. hide/disable checkbox
  // 2. hide edit/trash/1mtd
  // 3. show save/undo
};

onMounted(() => {
  checkboxDone = document.getElementById("checkbox-done");
});
</script>

<style scoped>
section {
  background-color: #efefef;
}

.task {
  transition: background-color 300ms;
}

.task:hover {
  background-color: hsl(171, 100%, 96%);
  transition: background-color 300ms;
  cursor: pointer;
}

.column {
  padding-block: 0.5rem;
}

form,
.task-info,
.actions {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.task-info:hover {
  cursor: pointer;
}

form {
  background-color: aquamarine;
}

.actions {
  background-color: lightgoldenrodyellow;
}

/* .icon > i {
  transition: all 250ms;
} */

.icon:hover > i {
  font-size: 1.25rem;
  color: green;
  /* transition: all 250ms; */

  /* transition-property: font-size;
  transition-duration: 2s;
  transition-timing-function: linear;
  transition-delay: 0; */
}
</style>
