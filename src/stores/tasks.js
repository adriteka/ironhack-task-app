import { defineStore } from "pinia";
import { selectAllTasks, insertTask, updateTask, deleteTask } from "../api";

export const taskPriorities = {
  critical: 3,
  opportunity: 2,
  horizon: 1,
};

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    // tasksCritical: [],
    // tasksOpportunity: [],
    // tasksHorizon: [],
    // TODO tasksArchived: [],
    // TODO tasksTrashed: [] isTrashed
  }),
  actions: {
    getTask(id) {
      return this.tasks.find((t) => t.id === id);
    },

    // removeTaskFromList(id, priority) {
    //   let arr = [];
    //   switch (priority) {
    //     case taskPriorities.critical:
    //       arr = this.tasksCritical;
    //       break;
    //     case taskPriorities.opportunity:
    //       arr = this.tasksOpportunity;
    //       break;
    //     case taskPriorities.horizon:
    //       arr = this.tasksHorizon;
    //       break;
    //   }
    //   const index = arr.findIndex((t) => {
    //     t.id === id;
    //   });
    //   arr.splice(index, 1);
    // },

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

    async createTask(fieldValues) {
      const t = await insertTask(fieldValues);
      this.tasks.push(t);
      return t;
    },

    async modifyTask(t, fieldValues) {
      // TODO - check dates are not empty
      await updateTask(t.id, fieldValues);
      for (let key in fieldValues) {
        t[key] = fieldValues[key];
        console.log(`modifyTask ${key} ${t[key]}`);
      }
    },

    async removeTask(t) {
      await deleteTask(t.id);
      const index = this.tasks.findIndex((elem) => elem.id === t.id);
      this.tasks.splice(index, 1);
      // 3-ARRAY
      // removeTaskFromList(t.id, t.priority)
    },

    async archiveTask(t) {
      const fieldValues = {
        isArchived: true,
        // TODO isCompleted: true,
      };
      // TODO task.isCompleted = true;
      await updateTask(t.id, fieldValues);
      t.isArchived = true;
    },

    async deferTask(t, newDate) {
      const fieldValues = {
        startDate: newDate,
        refreshedAt: new Date(),
      };
      await updateTask(t.id, fieldValues);
    },

    async completeTask(t) {
      const fieldValues = {
        isCompleted: true,
        completedAt: new Date(),
      };
      await updateTask(t.id, fieldValues);
    },
  }, // end of actions
});
