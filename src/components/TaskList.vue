<template>
  <header>
    <div>Id</div>
    <div>Complete</div>
    <div>Task</div>
    <div>Priority</div>
    <div>Start Date</div>
    <div>Due Date</div>
    <div>Actions</div>
  </header>
  <section v-if="tasks">
    <!-- @dblclick="toggleFieldSet(t.id)" -->
    <div v-for="t in tasks" :key="t.id">
      <form @submit.prevent="onSubmit(t)">
        <div>{{ t.id }}</div>
        <input
          v-model="t.isCompleted"
          @change="onCompletedClick(t)"
          type="checkbox"
          id=""
        />
        <fieldset disabled :id="'fieldset-' + t.id">
          <input v-model="t.title" type="text" id="" />
          <select v-model="t.priority" id="">
            <option value="3">Critical</option>
            <option value="2">Opportunity</option>
            <option value="1">Horizon</option>
          </select>
          <input v-model="t.startDate" type="date" id="" />
          <input v-model="t.dueDate" type="date" id="" />
        </fieldset>
      </form>
      <div>
        <button @click="onEditClick(t.id)">Edit</button>
        <button @click="onDeleteClick(t)">Delete</button>
        <button @click="onDeferClick(t.id)">Defer</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTaskStore, taskPriorities } from "../stores";
const taskStore = useTaskStore();
const tasks = computed(() => {
  const arr = taskStore.tasks.filter(
    (t) => t.priority === taskPriorities.critical
  );
  console.log("computed critical", arr);
  return arr;
  // TODO sort
});

const onSubmit = (t) => {
  // document.getElementById("fieldset-" + taskId).disabled = true;
  console.log("onSubmit", t);
  if (!t.dueDate) t.dueDate = null;
  try {
    taskStore.modifyTask(t);
    toggleFieldSet(t.id);
  } catch (e) {
    console.log(e);
  }
};

const onCompletedClick = (t) => {
  // const task = taskStore.getTask(taskId);
  console.log(
    `onCompletedClick: ${t.id} ${t.isCompleted} ${typeof t.isCompleted}`
  );
  console.log(t);
  t.title = "Pues lo cambio";
  // if (t.isCompleted) {
  //   t.completetedAt = new Date();
  //   console.log("isCompleted TRUE", t.completedAt);
  // } else {
  //   t.completedAt = null;
  //   console.log("isCompleted FALSE", t.completedAt);
  // }
  // console.log("onCompletedClick", task);
  // try {
  // taskStore.modifyTask(t);
  // } catch (e) {
  //   console.log(e);
  // }
};

const onEditClick = (taskId) => {
  toggleFieldSet(taskId);
  // TODO guardar copia de tarea antes de ser modificada en caso de undo
};

const onDeleteClick = (task) => {
  const accept = confirm("Delete for sure?");
  if (accept) {
    try {
      taskStore.removeTask(task);
    } catch (e) {
      console.log(e);
    }
  }
};

onMounted(async () => {
  // if (!taskStore.tasks)
  await taskStore.getAllTasks();
});

const toggleFieldSet = (taskId) => {
  const fieldset = document.getElementById("fieldset-" + taskId);
  fieldset.disabled = !fieldset.disabled;
};
</script>

<style scoped>
header,
form {
  display: flex;
  gap: 1rem;
}

section > div {
  display: flex;
  gap: 1rem;
}

section > div > :last-child {
  background-color: lightgoldenrodyellow;
  display: flex;
  gap: 1rem;
  align-items: center;
}

form {
  background-color: aquamarine;
  width: 100%;
}
</style>
