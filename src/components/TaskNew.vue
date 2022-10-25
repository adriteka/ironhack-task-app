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
            ref="inputTitle"
            type="text"
            id="title"
            placeholder="What you intend to do"
            class="input is-size-6-5"
            :class="{ 'is-danger': formErrors.title }"
          />
          <p class="help is-danger">{{ formErrors.title }}</p>
        </div>

        <div class="field column is-2">
          <label class="label is-size-7-5 is-uppercase" for="priority"
            >Urgency</label
          >
          <div class="select">
            <select
              v-model="formValues.priority"
              @change="setStartDate()"
              id="priority"
            >
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
            ref="inputStartDate"
            type="date"
            id="start-date"
            class="input is-size-6-5"
            :disabled="formValues.priority === taskPriorities.critical"
          />

          <p
            class="help"
            :class="{
              'is-info': formValues.priority === taskPriorities.critical,
              'is-danger':
                formValues.priority !== taskPriorities.critical &&
                formErrors.startDate,
            }"
          >
            {{ formErrors.startDate }}
          </p>
        </div>

        <div class="field column is-2">
          <label class="label is-size-7-5 is-uppercase" for="due-date"
            >Due Date</label
          >
          <input
            v-model="formValues.dueDate"
            ref="inputDueDate"
            type="date"
            id="due-date"
            class="input is-size-6-5"
            :class="{ 'is-danger': formErrors.dueDate }"
          />
          <p class="help is-danger">{{ formErrors.dueDate }}</p>
        </div>
        <div class="field column buttons">
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
          <button
            type="button"
            @click="resetForm()"
            class="button is-size-6-5"
            id="reset-button"
          >
            Reset
          </button>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
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

const formErrors = ref({
  titleError: null,
  startDate: null,
  dueDate: null,
});

const inputTitle = ref(null);
const inputStartDate = ref(null);
const inputDueDate = ref(null);

const setStartDate = () => {
  if (formValues.value.priority === taskPriorities.critical) {
    formValues.value.startDate = new Date().toISOString().split("T")[0];
    formErrors.value.startDate = "Critical starts today";
  } else formErrors.value.startDate = null;
};

const checkTitle = () => {
  if (formValues.value.title.length < 10) {
    formErrors.value.title = "At least 10 characters";
    return false;
  }
  formErrors.value.title = null;
  return true;
};

const checkStartDate = () => {
  if (!formValues.value.startDate || !formValues.value.startDate.length) {
    formErrors.value.startDate = "Start date should be specified";
    return false;
  }
  formErrors.value.startDate = null;
  return true;
};

const checkDueDate = () => {
  if (formValues.value.dueDate != null && !formValues.value.dueDate.length)
    formValues.value.dueDate = null;
  else if (
    formValues.value.dueDate &&
    formValues.value.dueDate < formValues.value.startDate
  ) {
    formErrors.value.dueDate = "Can't be prior to start date";
    return false;
  }
  formErrors.value.dueDate = null;
  return true;
};

const handleSubmit = () => {
  // TODO - validate form
  if (!checkTitle()) {
    inputTitle.value.focus();
    return;
  }
  if (!checkStartDate()) {
    inputStartDate.value.focus();
    return;
  }
  if (!checkDueDate()) {
    inputDueDate.value.focus();
    return;
  }

  // throw-try-catch
  taskStore.createTask(formValues.value);
  resetForm();
};

const resetForm = () => {
  formValues.value.title = "";
  formValues.value.priority = taskPriorities.opportunity;
  formValues.value.startDate = new Date().toISOString().split("T")[0];
  formValues.value.dueDate = null;
  inputTitle.value.focus();
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

<style scoped>
.help {
  height: 18px;
}
</style>
