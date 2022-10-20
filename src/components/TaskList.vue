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
  <section v-if="taskStore.tasks">
    <!-- @dblclick="toggleFieldSet(task.id)" -->
    <div v-for="task in taskStore.tasks" :key="task.id">
      <form @submit.prevent="onSubmit(task.id)">
        <div>{{ task.id }}</div>
        <input
          v-model="task.isComplete"
          @click="onCompleteClick(task)"
          type="checkbox"
          id=""
        />
        <fieldset disabled :id="'fieldset-' + task.id">
          <input v-model="task.title" type="text" id="" />
          <select v-model="task.priority" id="">
            <option value="3">Critical</option>
            <option value="2">Opportunity</option>
            <option value="1">Horizon</option>
          </select>
          <input v-model="task.startDate" type="date" id="" />
          <input v-model="task.dueDate" type="date" id="" />
        </fieldset>
        <div>
          <button @click="onEditClick(task.id)">Edit</button>
          <button @click="onDeleteClick(task.id)">Delete</button>
          <button @click="onDeferClick(task.id)">Defer</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useTaskStore } from "../stores";
const taskStore = useTaskStore();

const onSubmit = (taskId) => {
  // document.getElementById("fieldset-" + taskId).disabled = true;
  const task = taskStore.getTask(taskId);
  if (!task.dueDate) task.dueDate = null;
  try {
    taskStore.modifyTask(task);
  } catch (e) {
    console.log(e);
  }
};

const onCompleteClick = (task) => {
  // const task = taskStore.getTask(taskId);
  // if (task.isComplete) {
  //   task.completionDate = new Date();
  //   console.log("isComplete TRUE", task.completionDate);
  // } else {
  //   task.completionDate = null;
  //   console.log("isComplete FALSE", task.completionDate);
  // }
  // console.log("onCompleteClick", task);
  // try {
    taskStore.modifyTask(task);
  // } catch (e) {
  //   console.log(e);
  // }
};

const onEditClick = (taskId) => {
  toggleFieldSet(taskId);
  // TODO guardar copia de tarea antes de ser modificada
};

const onDeleteClick = (taskId) => {
  const accept = confirm("Delete for sure?");
  if (accept) {
    try {
      taskStore.removeTask(taskId);
    } catch (e) {
      console.log(e);
    }
  }
};

onMounted(async () => {
  // (if !taskStore.tasks)
  await taskStore.getTasks();

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

form {
  background-color: aquamarine;
  width: 100%;
}
</style>
