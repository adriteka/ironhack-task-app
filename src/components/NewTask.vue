<template>
  <section class="box">
    <form @submit.prevent="handleSubmit()">
      <fieldset
        class="columns is-variable is-1"
        :disabled="taskStore.taskBeingEdited"
      >
        <div class="field column is-3">
          <label class="label is-size-7-5 is-uppercase" for="title"
            >New Task</label
          >
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
          <label class="label is-size-7-5 is-uppercase" for="priority"
            >Urgency</label
          >
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
          <label class="label is-size-7-5 is-uppercase" for="start-date"
            >Start Date</label
          >

          <input
            v-model="formValues.startDate"
            type="date"
            id="start-date"
            class="input is-size-6-5"
          />

          <p class="help is-success">This username is available</p>
        </div>

        <div class="field column is-2">
          <label class="label is-size-7-5 is-uppercase" for="due-date"
            >Due Date</label
          >
          <input
            v-model="formValues.dueDate"
            type="date"
            id="due-date"
            class="input is-size-6-5"
          />
          <p class="help is-success">This username is available</p>
        </div>
        <div class="field column">
          <label
            class="label is-size-7-5 is-uppercase is-invisible"
            for="create-button"
            >Action</label
          >
          <button
            type="submit"
            class="button is-primary is-size-6-5"
            id="create-button"
          >
            Create
          </button>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
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

const inputTitle = ref(null);

const handleSubmit = () => {
  // TODO - validate form
  console.log("handleSubmit formValues.value", formValues.value);
  taskStore.createTask(formValues.value);
  resetForm();
  inputTitle.value.focus();
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

onMounted(() => {
  inputTitle.value.focus();
});
</script>

<style scoped></style>
