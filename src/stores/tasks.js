import { defineStore } from "pinia";
import { selectTasks, insertTask, updateTask, deleteTask } from "../api";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    getTask(id) {
      return this.tasks.find((task) => {
        if (task.id === id) return task;
      });
    },
    async getTasks() {
      this.tasks = await selectTasks();
    },
    async createTask(task) {
      task.id = await insertTask(task);
      console.log("createTask", task);
      this.tasks.push(task);
    },
    async modifyTask(task) {
      console.log("modifyTask", task);
      await updateTask(task);
    },
    async removeTask(id) {
      await deleteTask(id);
      const index = this.tasks.findIndex((task) => {
        if (task.id === id) return true;
      });
      this.tasks.splice(index, 1);
    },
  },
});
