import { defineStore } from "pinia";
import { selectAllTasks, insertTask, updateTask2, deleteTask } from "../api";

export const taskPriorities = {
  critical: 3,
  opportunity: 2,
  horizon: 1,
};

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    tasksCritical: [],
    tasksOpportunity: [],
    tasksHorizon: [],
    // TODO tasksArchived: [],
    // TODO tasksTrashed: [] isTrashed
  }),
  actions: {
    getTask(id) {
      return this.tasks.find((t) => t.id === id);
    },

    removeTaskFromList(id, priority) {
      let arr = [];
      switch (priority) {
        case taskPriorities.critical:
          arr = this.tasksCritical;
          break;
        case taskPriorities.opportunity:
          arr = this.tasksOpportunity;
          break;
        case taskPriorities.horizon:
          arr = this.tasksHorizon;
          break;
      }
      const index = arr.findIndex((t) => {
        t.id === id;
      });
      arr.splice(index, 1);
    },

    async getAllTasks() {
      this.tasks = await selectAllTasks();
      // this.tasksCritical = this.tasks.filter(
      //   (t) => t.priority === taskPriorities.critical
      // );
      // this.tasksOpportunity = this.tasks.filter(
      //   (t) => t.priority === taskPriorities.opportunity
      // );
      // this.tasksHorizon = this.tasks.filter(
      //   (t) => t.priority === taskPriorities.horizon
      // );
    },

    async createTask(t) {
      t.id = await insertTask(t);
      this.tasks.push(t);
      return t.id;
    },

    async modifyTask(t) {
      console.log("modifyTask", t);
      // TODO - check dates are not empty
      // TODO - upgrade from updateTask2 to updateTask
      const fieldChanges = {
        title: t.title,
        priority: t.priority,
        startDate: t.startDate,
        dueDate: t.dueDate,
      };
      await updateTask2(fieldChanges, t.id);
    },

    async removeTask(t) {
      await deleteTask(t.id);
      const index = this.tasks.findIndex((elem) => elem.id === t.id);
      this.tasks.splice(index, 1);
    },

    async archiveTask(t, id) {
      const fieldChanges = {
        isArchived: true,
        // TODO isCompleted: true,
      };
      t.isArchived = true;
      // TODO task.isCompleted = true;
      await updateTask2(fieldChanges, id);
    },

    async completeTask(t, id) {
      const fieldChanges = {
        isCompleted: true,
        completedAt: new Date(),
      };
      await updateTask2(fieldChanges, id);
    },
  }, // end of actions
});
