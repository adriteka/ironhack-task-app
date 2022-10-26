<template>
  <section>
    <header
      class="is-flex is-justify-content-space-between is-align-items-center"
    >
      <h3 class="title is-5 tasklist-title"><slot></slot></h3>
      <p>{{ qtyTasks }}</p>
    </header>
    <div v-if="props.tasks.length">
      <div
        class="columns ml-0 mr-0 is-variable is-2 is-size-7-5 is-uppercase has-text-weight-semibold has-text-grey"
      >
        <p class="column is-5 pt-2">Task</p>
        <p class="column is-2 pt-2">Start date</p>
        <p class="column is-2 pt-2">Due date</p>
        <p class="column pt-2">Actions</p>
      </div>
      <TransitionGroup name="list" appear>
        <Task v-for="t in props.tasks" :id="t.id" :key="t.id" />
      </TransitionGroup>
    </div>
    <div v-else class="empty">
      <Transition name="list" appear>
        <p class="has-text-grey-light is-size-6">
          Nothing to work with on this front
        </p>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { defineProps, computed, TransitionGroup } from "vue";
import Task from "../components/Task.vue";
const props = defineProps(["tasks"]);

const qtyTasks = computed(() => {
  const qty = props.tasks.length;
  if (!qty) return "No tasks";
  else if (qty === 1) return "1 task";
  else return `${qty} tasks`;
});
</script>

<style scoped>
.tasklist-title {
  margin-bottom: 0;
}

.tasklist-heading > :last-child {
  flex: 1;
  /* padding-inline: 0.375rem; */
  background-color: aquamarine;
}

header {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  padding-bottom: 0.75rem;
  border-bottom: 2px solid black;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

header p {
  color: gray;
}

.empty > p {
  text-align: center;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
