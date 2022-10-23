<template>
  <section>
    <!-- TODO toggleEdit en columna, no toda la row -->
    <!-- @dblclick="toggleEdit()" -->
    <!-- <div v-if="!isEdit" class="task-info" @dblclick="toggleEdit()"> -->

    <!-- <div v-if="!isEdit" class="row-adjust"> -->
    <!-- <div  v-if="!isEdit" class="columns"> -->
    <div
      v-if="!isEdit"
      class="columns ml-0 mr-0 mb-4 is-variable is-2 has-background-light"
      :class="classesTaskCompleted"
    >
      <p class="column is-5 pt-4 pb-4">
        <span
          @dblclick="toggleEdit('inputTitle')"
          :class="{ pointer: !task.isCompleted }"
          :title="task.isCompleted ? '' : 'Double-click to edit'"
          >{{ task.title }}</span
        >
      </p>

      <p class="column is-2 pt-4 pb-4">
        <span
          @dblclick="toggleEdit('inputStartDate')"
          :class="{ pointer: !task.isCompleted }"
          :title="task.isCompleted ? '' : 'Double-click to edit'"
          >{{ taskStore.getFormattedDate(task.startDate) }}</span
        >
      </p>
      <p class="column is-2 pt-4 pb-4">
        <span
          @dblclick="toggleEdit('inputDueDate')"
          :class="{ pointer: !task.isCompleted }"
          :title="task.isCompleted ? '' : 'Double-click to edit'"
          >{{ taskStore.getFormattedDate(task.dueDate) }}</span
        >
      </p>
      <div class="actions column pt-4 pb-4 has-background-white-bis">
        <font-awesome-icon
          v-if="task.isCompleted"
          @click="handleCompleted(false)"
          icon="fa-regular fa-square-check"
          title="Mark as pending"
          class="pointer has-text-primary"
        />
        <font-awesome-icon
          v-else
          @click="handleCompleted(true)"
          icon="fa-regular fa-square"
          title="Mark as completed"
          class="pointer has-text-primary"
        />
        <font-awesome-icon
          @click="toggleEdit()"
          icon="fa-solid fa-pen-to-square"
          title="Edit"
          class="pointer has-text-info"
          :class="{ 'is-hidden': task.isCompleted }"
        />
        <font-awesome-icon
          @click="handleDelete()"
          icon="fa-solid fa-trash-can"
          title="Trash"
          class="pointer has-text-danger"
        />

        <span
          class="is-size-7-5 has-text-grey-lighter"
          :class="{ 'is-hidden': task.isCompleted }"
          >●</span
        >
        <font-awesome-icon
          @click="handleRefresh()"
          icon="fa-solid fa-rotate"
          title="Refresh to today"
          class="pointer"
          :class="{ 'is-hidden': task.isCompleted }"
        />
        <font-awesome-icon
          v-if="task.priority !== taskPriorities.critical"
          @click="handlePostpone()"
          icon="fa-solid fa-hourglass-start"
          :title="getPostponeTitle()"
          class="pointer"
          :class="{ 'is-hidden': task.isCompleted }"
        />
        <span
          class="is-size-7-5 has-text-grey-lighter"
          :class="{ 'is-hidden': task.isCompleted }"
          >●</span
        >
        <font-awesome-icon
          v-if="task.priority !== taskPriorities.critical"
          @click="
            handlePriorityChange(
              task.priority === taskPriorities.horizon
                ? taskPriorities.opportunity
                : taskPriorities.critical
            )
          "
          icon="fa-solid fa-up-long"
          :title="getPromoteTitle()"
          class="pointer"
          :class="{ 'is-hidden': task.isCompleted }"
        />
        <font-awesome-icon
          v-if="task.priority !== taskPriorities.horizon"
          @click="
            handlePriorityChange(
              task.priority === taskPriorities.critical
                ? taskPriorities.opportunity
                : taskPriorities.horizon
            )
          "
          icon="fa-solid fa-down-long"
          :title="getDemoteTitle()"
          class="pointer"
          :class="{ 'is-hidden': task.isCompleted }"
        />

        <!-- <div>{{ task.id }}</div> -->
      </div>
    </div>
    <!-- </div> -->
    <!-- <div v-else class="columns is-variable is-2 mb-4" > -->
    <div v-else class="columns ml-0 mr-0 mb-4 is-variable is-2  has-background-light">
      <div class="column is-3 pl-2">
        <input
          v-model="formValues.title"
          type="text"
          id="title"
          ref="inputTitle"
          placeholder="What you intend to do"
          class="input is-size-7"
        />
      </div>

      <div class="column is-2">
        <div class="select is-size-7">
          <select v-model="formValues.priority" id="priority">
            <option :value="taskPriorities.critical">Critical</option>
            <option :value="taskPriorities.opportunity" default>
              Opportunity
            </option>
            <option :value="taskPriorities.horizon">Horizon</option>
          </select>
        </div>
      </div>

      <div class="column is-2">
        <input
          v-model="formValues.startDate"
          type="date"
          ref="inputStartDate"
          id="start-date"
          class="input is-size-7"
        />
      </div>

      <div class="column is-2">
        <input
          v-model="formValues.dueDate"
          type="date"
          ref="inputDueDate"
          id="due-date"
          class="input is-size-7"
        />
      </div>

      <div class="column actions has-background-white-bis">
        <font-awesome-icon
          @click="handleSave()"
          icon="fa-solid fa-circle-check"
          title="Update task"
          class="pointer has-text-primary"
        />
        <font-awesome-icon
          @click="toggleEdit()"
          icon="fa-solid fa-circle-xmark"
          title="Undo changes"
          class="pointer has-text-danger"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTaskStore, taskPriorities } from "../stores";
import { defineProps, onMounted, onUpdated, ref, computed } from "vue";
const taskStore = useTaskStore();
const props = defineProps(["id"]);
const task = taskStore.getTask(props.id);
const isEdit = ref(false);
let checkboxDone;

const inputTitle = ref(null);
const inputStartDate = ref(null);
const inputDueDate = ref(null);
let focusInputRef = null;

const formValues = ref({
  isCompleted: task.isCompleted,
  title: task.title,
  priority: task.priority,
  startDate: task.startDate,
  dueDate: task.dueDate,
});

const classesTaskCompleted = computed(() => {
  const classes = {
    "is-linethrough": task.isCompleted,
    "has-text-grey-light": task.isCompleted,
    "has-background-white-bis": task.isCompleted,
  };
  return classes;
});

const getPostponeDate = () => {
  const date = new Date(task.startDate);
  let day;

  // If Horizon: postpone until sunday after startDate
  // Else: postpone until day after startDate
  if (task.priority === taskPriorities.horizon)
    day = date.getDate() - date.getDay() + 7;
  else day = date.getDate() + 1;

  return new Date(date.setDate(day)).toISOString().split("T")[0];
};

const getPostponeTitle = () => {
  let title = "Postpone to ";
  const formattedDate = taskStore
    .getFormattedDate(getPostponeDate())
    .toLowerCase();
  if (task.priority === taskPriorities.horizon)
    title += `following Sunday (${formattedDate})`;
  else title += formattedDate;
  return title;
};

const getPromoteTitle = () => {
  let title = "Advance to ";
  if (task.priority === taskPriorities.opportunity) title += "Critical";
  else title += "Opportunity";
  return title;
};

const getDemoteTitle = () => {
  let title = "Push down to ";
  if (task.priority === taskPriorities.opportunity) title += "Horizon";
  else title += "Opportunity";
  return title;
};

const handleCompleted = (newStatus) => {
  const fieldValues = {
    isCompleted: newStatus,
    completedAt: newStatus ? Date.now() : null,
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
  taskStore.modifyTask(task, {
    startDate: getPostponeDate(),
    refreshedAt: Date.now(),
  });
};

const handlePriorityChange = (newPriority) => {
  const fieldValues = {
    priority: newPriority,
    // startDate: new Date().toISOString().split("T")[0],
    refreshedAt: Date.now(),
  };
  taskStore.modifyTask(task, fieldValues);
};

const toggleEdit = (inputRef) => {
  isEdit.value = !isEdit.value;
  if (isEdit.value) {
    formValues.value.isCompleted = task.isCompleted;
    formValues.value.title = task.title;
    formValues.value.priority = task.priority;
    formValues.value.startDate = task.startDate;
    formValues.value.dueDate = task.dueDate;
    focusInputRef = inputRef;
  } else focusInputRef = null;
  // TODO - estilo dinámico
  // 1. hide/disable checkbox
  // 2. hide edit/trash/1mtd
  // 3. show save/undo
};

onMounted(() => {
  checkboxDone = document.getElementById("checkbox-done");
});

onUpdated(() => {
  if (!focusInputRef) return;
  switch (focusInputRef) {
    case "inputTitle":
      inputTitle.value.focus();
      break;
    case "inputStartDate":
      inputStartDate.value.focus();
      break;
    case "inputDueDate":
      inputDueDate.value.focus();
      break;
  }
  focusInputRef = null;
});
</script>

<style scoped>
/* section {
  background-color: #efefef;
} */

/* .row-adjust {
  height: 2.875rem;
} */

/* .task {
  transition: background-color 300ms;
} */

/* .task-title {
  display: flex;
  align-items: center;
  gap: 0.25rem;
} */

/* .task-title > :first-child {
  max-width: 2rem;
} */

/* .task-title > :last-child {
  flex: 1;
} */

/* .task-field {
  cursor: pointer;
} */

/* .task:hover {
  background-color: hsl(171, 100%, 96%);
  transition: background-color 300ms;
} */

/* .column {
  padding-block: 0.5rem;
} */

form,
.actions {
  display: flex;
  gap: 0.875rem;
  align-items: center;
}

form {
  background-color: aquamarine;
}

svg {
  height: 1.125rem;
  height: 18px;
}

/* svg:hover {
  height: 1.25rem;
} */

/* .fa-circle-check {
  color: hsl(171, 100%, 41%)
} */

.fa-pen-to-square:hover {
  color: green;
  /* transition: all 250ms; */

  /* transition-property: font-size;
  transition-duration: 2s;
  transition-timing-function: linear;
  transition-delay: 0; */
}

/* .columns {
  background-color: #efefef;
} */
</style>
