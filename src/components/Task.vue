<template>
  <section>
    <!-- NO TASK being edited -->
    <!-- -modal -->
    <ModalTaskDelete v-if="isModalOpen"
      :taskTitle="modalTaskTitle"
      @close="closeModal"
    />
    <div
      v-if="!taskStore.taskBeingEdited"
      class="columns ml-0 mr-0 mb-4 is-variable is-2 has-background-light"
      :class="classesTaskCompleted"
    >
      <p class="column is-5 pt-4 pb-4">
        <span
          @dblclick="toggleEdit('inputTitle')"
          :class="{ 'cursor-pointer': !task.isCompleted }"
          :title="!task.isCompleted ? 'Double-click to edit' : ''"
          >{{ task.title }}</span
        >
      </p>

      <p class="column is-2 pt-4 pb-4">
        <span
          @dblclick="toggleEdit('inputStartDate')"
          :class="{ 'cursor-pointer': !task.isCompleted }"
          :title="!task.isCompleted ? 'Double-click to edit' : ''"
          >{{ taskStore.getFormattedDate(task.startDate) }}</span
        >
      </p>

      <p class="column is-2 pt-4 pb-4">
        <span
          @dblclick="toggleEdit('inputDueDate')"
          :class="{ 'cursor-pointer': !task.isCompleted }"
          :title="!task.isCompleted ? 'Double-click to edit' : ''"
          >{{ taskStore.getFormattedDate(task.dueDate) }}</span
        >
      </p>
      <div
        class="actions column pt-4 pb-4 has-background-white-bis icon-pointer"
      >
        <font-awesome-icon
          v-if="task.isCompleted && !task.isArchived"
          @click="handleCompleted(false)"
          icon="fa-regular fa-square-check"
          title="Mark as pending"
          class="has-text-primary"
        />
        <font-awesome-icon
          v-else-if="!task.isArchived"
          @click="handleCompleted(true)"
          icon="fa-regular fa-square"
          title="Mark as completed"
          class="has-text-primary"
        />

        <font-awesome-icon
          @click="toggleEdit()"
          icon="fa-solid fa-pen-to-square"
          title="Edit"
          class="has-text-info"
          :class="{ 'is-hidden': task.isCompleted }"
        />

        <font-awesome-icon
          v-if="task.isCompleted && !task.isArchived"
          @click="handleArchive()"
          icon="fa-solid fa-arrow-right-to-bracket"
          title="Archive"
          class="rotate-90 has-text-info"
        />
        <font-awesome-icon
          v-else-if="task.isArchived"
          @click="handleArchive()"
          icon="fa-solid fa-arrow-up-from-bracket"
          title="Restore"
          class="has-text-info"
        />

        <font-awesome-icon
          v-if="!task.isCompleted || task.isArchived"
          @click="handleDelete()"
          icon="fa-solid fa-trash-can"
          title="Delete"
          class="has-text-danger"
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
          class="'cursor-pointer'"
          :class="{ 'is-hidden': task.isCompleted }"
        />
        <font-awesome-icon
          v-if="task.priority !== taskPriorities.critical"
          @click="handlePostpone()"
          icon="fa-solid fa-hourglass-start"
          :title="getPostponeTitle()"
          class="'cursor-pointer'"
          :class="{ 'is-hidden': task.isCompleted }"
        />
        <font-awesome-icon
          v-if="task.priority !== taskPriorities.critical"
          @click="handlePriorityAdvance()"
          icon="fa-solid fa-angles-up"
          :title="getPromoteTitle()"
          class="'cursor-pointer'"
          :class="{ 'is-hidden': task.isCompleted }"
        />
      </div>
    </div>

    <!-- A DIFFERENT TASK being edited -->
    <div
      v-else-if="taskStore.taskBeingEdited !== task"
      class="columns ml-0 mr-0 mb-4 is-variable is-2 has-background-light"
      :class="classesTaskCompleted"
    >
      <p class="column is-5 pt-4 pb-4">
        {{ task.title }}
      </p>
      <p class="column is-2 pt-4 pb-4">
        {{ taskStore.getFormattedDate(task.startDate) }}
      </p>
      <p class="column is-2 pt-4 pb-4">
        {{ taskStore.getFormattedDate(task.dueDate) }}
      </p>

      <div
        class="actions column pt-4 pb-4 has-background-white-bis has-text-grey-light icon-not-allowed"
      >
        <font-awesome-icon
          v-if="task.isCompleted"
          icon="fa-regular fa-square-check"
        />
        <font-awesome-icon
          v-else-if="!task.isArchived"
          icon="fa-regular fa-square"
        />

        <font-awesome-icon
          icon="fa-solid fa-pen-to-square"
          title="Edit"
          :class="{ 'is-hidden': task.isCompleted }"
        />

        <font-awesome-icon
          v-if="task.isCompleted && !task.isArchived"
          icon="fa-solid fa-arrow-right-to-bracket"
          class="rotate-90"
        />
        <font-awesome-icon
          v-else-if="task.isArchived"
          icon="fa-solid fa-arrow-up-from-bracket"
        />

        <font-awesome-icon
          v-if="!task.isCompleted || task.isArchived"
          icon="fa-solid fa-trash-can"
        />

        <span
          class="is-size-7-5 has-text-grey-lighter"
          :class="{ 'is-hidden': task.isCompleted }"
          >●</span
        >
        <font-awesome-icon
          icon="fa-solid fa-rotate"
          title="Refresh to today"
          :class="{ 'is-hidden': task.isCompleted }"
        />
        <font-awesome-icon
          v-if="task.priority !== taskPriorities.critical"
          icon="fa-solid fa-hourglass-start"
          :class="{ 'is-hidden': task.isCompleted }"
        />
        <font-awesome-icon
          v-if="task.priority !== taskPriorities.critical"
          icon="fa-solid fa-angles-up"
          :class="{ 'is-hidden': task.isCompleted }"
        />
      </div>
    </div>

    <!-- THIS TASK being edited -->
    <div
      v-else
      class="columns ml-0 mr-0 mb-4 is-variable is-2 has-background-light"
    >
      <div class="column is-3 pl-2">
        <input
          v-model="formValues.title"
          type="text"
          id="title"
          ref="inputTitle"
          placeholder="What you intend to do"
          class="input is-size-7"
          :class="{ 'is-danger': formErrors.title }"
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
          :disabled="formValues.priority === taskPriorities.critical"
          :class="{
            'is-info': formValues.priority === taskPriorities.critical,
            'is-danger': formErrors.startDate,
          }"
        />
      </div>

      <div class="column is-2">
        <input
          v-model="formValues.dueDate"
          type="date"
          ref="inputDueDate"
          id="due-date"
          class="input is-size-7"
          :class="{ 'is-danger': formErrors.dueDate }"
        />
      </div>

      <div class="column actions has-background-white-bis icon-pointer">
        <font-awesome-icon
          @click="handleSave()"
          icon="fa-solid fa-circle-check"
          title="Update task"
          class="has-text-primary"
        />
        <font-awesome-icon
          @click="toggleEdit()"
          icon="fa-solid fa-circle-xmark"
          title="Undo changes"
          class="has-text-danger"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTaskStore, taskPriorities } from "../stores";
import { defineProps, onUpdated, ref, computed } from "vue";

// -modal
import ModalTaskDelete from "./ModalTaskDelete.vue";
const isModalOpen = ref(false);
const modalTaskTitle = ref("");

const taskStore = useTaskStore();
const props = defineProps(["id"]);
const task = taskStore.getTask(props.id);

const inputTitle = ref(null);
const inputStartDate = ref(null);
const inputDueDate = ref(null);
let focusInputRef = null;

const formValues = ref({
  title: task.title,
  priority: task.priority,
  startDate: task.startDate,
  dueDate: task.dueDate,
});

const formErrors = ref({
  title: null,
  startDate: null,
  dueDate: null,
});

const classesTaskCompleted = computed(() => {
  const classes = {
    "is-linethrough": task.isCompleted && !task.isArchived,
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
  let title = "Postpone until ";
  const formattedDate = taskStore
    .getFormattedDate(getPostponeDate())
    .toLowerCase();
  if (task.priority === taskPriorities.horizon)
    title += `following Sunday (${formattedDate})`;
  else title += formattedDate;
  return title;
};

const getPromoteTitle = () => {
  const today = new Date().toISOString().split("T")[0];
  let title = "Advance to ";
  if (task.priority === taskPriorities.opportunity) title += "Critical";
  else title += "Opportunity";
  if (task.startDate <= today || task.priority === taskPriorities.opportunity)
    title += " today";
  return title;
};

const handleCompleted = (newStatus) => {
  const fieldValues = {
    isCompleted: newStatus,
    completedAt: newStatus ? Date.now() : null,
  };
  taskStore.modifyTask(task, fieldValues);
};

const isErrorTitle = () => {
  formErrors.value.title = formValues.value.title.length < 10;
  return formErrors.value.title;
};

const isErrorStartDate = () => {
  formErrors.value.startDate =
    !formValues.value.startDate || !formValues.value.startDate.length;
  return formErrors.value.startDate;
};

const isErrorDueDate = () => {
  formErrors.value.dueDate =
    formValues.value.dueDate &&
    formValues.value.dueDate < formValues.value.startDate;
  return formErrors.value.dueDate;
};

const handleSave = () => {
  if (isErrorTitle()) {
    inputTitle.value.focus();
    return;
  }

  if (formValues.value.dueDate != null && !formValues.value.dueDate.length)
    formValues.value.dueDate = null;

  if (isErrorStartDate()) {
    inputStartDate.value.focus();
    return;
  }
  if (isErrorDueDate()) {
    inputDueDate.value.focus();
    return;
  }

  if (task.priority !== formValues.priority)
    formValues.refreshedAt = Date.now();
  taskStore.modifyTask(task, formValues.value);
  toggleEdit();
};

// -modal
const closeModal = async (result) => {
  console.log("closeModal", result);
  isModalOpen.value = false;
  modalTaskTitle.value = "";
  if (result) await taskStore.removeTask(task);
};

// -modal
const handleDelete = () => {
  modalTaskTitle.value = task.title;
  isModalOpen.value = true;
};

// const handleDelete = async () => {
//   console.log("handleDelete", task);

//   isModalOpen = true;

//   const maxLength = 35;
//   const taskTitle =
//     task.title.length > maxLength
//       ? `${task.title.slice(0, maxLength)}…`
//       : task.title;
//   const accept = confirm(`Delete '${taskTitle}' for sure?`);
//   if (accept) await taskStore.removeTask(task);
// };

const handleArchive = () => {
  taskStore.modifyTask(task, { isArchived: !task.isArchived });
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

const handlePriorityAdvance = () => {
  const today = new Date().toISOString().split("T")[0];
  const fieldValues = {
    priority:
      task.priority === taskPriorities.horizon
        ? taskPriorities.opportunity
        : taskPriorities.critical,
    refreshedAt: Date.now(),
  };
  if (task.startDate <= today || task.priority === taskPriorities.opportunity)
    fieldValues.startDate = today;
  taskStore.modifyTask(task, fieldValues);
};

// METHODS that allowed both promoting & demoting priorities

// const getDemoteTitle = () => {
//   let title = "Push down to ";
//   if (task.priority === taskPriorities.opportunity) title += "Horizon";
//   else title += "Opportunity";
//   return title;
// };

// const handlePriorityChange = (newPriority) => {
//   const fieldValues = {
//     priority: newPriority,
//     // startDate: new Date().toISOString().split("T")[0],
//     refreshedAt: Date.now(),
//   };
//   taskStore.modifyTask(task, fieldValues);
// };

const toggleEdit = (inputRef) => {
  if (taskStore.taskBeingEdited) taskStore.taskBeingEdited = undefined;
  else taskStore.taskBeingEdited = task;
  if (taskStore.taskBeingEdited) {
    formValues.value.isCompleted = task.isCompleted;
    formValues.value.title = task.title;
    formValues.value.priority = task.priority;
    formValues.value.startDate = task.startDate;
    formValues.value.dueDate = task.dueDate;
    focusInputRef = inputRef;
  } else focusInputRef = null;
};

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
  height: 1.125rem; /* 18px */
}

/* svg:hover {
  filter: brightness(1.5);
} */

.actions.icon-pointer > svg {
  cursor: pointer;
}

.actions.icon-not-allowed > svg {
  cursor: not-allowed;
}

.rotate-90 {
  transform: rotate(90deg);
}

/* .fa-pen-to-square:hover {
  color: green;
  transition: all 250ms;
  transition-property: font-size;
  transition-duration: 2s;
  transition-timing-function: linear;
  transition-delay: 0;
} */

/* .columns {
  background-color: #efefef;
} */
</style>
