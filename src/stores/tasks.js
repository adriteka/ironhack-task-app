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
    taskBeingEdited: undefined,
    // taskBeingDeleted: undefined,
  }),
  actions: {
    getTask(id) {
      return this.tasks.find((t) => t.id === id);
    },

    getPriorityName(num) {
      switch (num) {
        case taskPriorities.critical:
          return "Critical";
        case taskPriorities.opportunity:
          return "Opportunity";
        default:
          return "Horizon";
      }
    },

    isDateDueByTomorrow(d) {
      if (!d) return false;
      // get due date in milliseconds
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      const time = date.getTime();

      // today in milliseconds
      const today = new Date();
      const timeToday = today.setHours(0, 0, 0, 0);

      // ms in 1 day
      const msPerDay = 86400000;

      // compare times
      if ((time - timeToday) / msPerDay <= 1) return true;
      else return false;
    },

    getFormattedDate(d) {
      if (!d) return "";
      const date = new Date(d);
      const dateStr = date.toDateString();

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (dateStr === yesterday.toDateString()) return "Yesterday";

      const today = new Date();
      today.setDate(today.getDate());
      if (dateStr === today.toDateString()) return "Today";

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (dateStr === tomorrow.toDateString()) return "Tomorrow";

      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    },

    async getAllTasks() {
      if (!this.tasks.length) this.tasks = await selectAllTasks();
      return this.tasks;
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
      }
    },

    async removeTask(t) {
      await deleteTask(t.id);
      const index = this.tasks.findIndex((elem) => elem.id === t.id);
      this.tasks.splice(index, 1);
      // 3-ARRAY
      // removeTaskFromList(t.id, t.priority)
    },

    // async deferTask(t, newDate) {
    //   const fieldValues = {
    //     startDate: newDate,
    //     refreshedAt: new Date(),
    //   };
    //   await updateTask(t.id, fieldValues);
    // },

    // async completeTask(t) {
    //   const fieldValues = {
    //     isCompleted: true,
    //     completedAt: new Date(),
    //   };
    //   await updateTask(t.id, fieldValues);
    // },
  }, // end of actions
});
