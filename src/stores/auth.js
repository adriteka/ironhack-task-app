import { defineStore } from "pinia";
import { signUp, logIn, logOut } from "../api";
import { useTaskStore } from "../stores";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    userId: undefined,
    email: undefined,
    darkMode: false,
    // TODO
    // name: undefined,
    // reviewDay: "sun",
    // theme: "light",
    // priorityStyle: "1mtd"
  }),
  actions: {
    async signUp(email, password) {
      const userId = await signUp(email, password);
    },
    async logIn(email, password) {
      const userId = await logIn(email, password);
      this.userId = userId;
      this.email = email;
      this.isAuth = true;
    },
    async logOut() {
      await logOut();
      this.userId = undefined;
      this.email = undefined;
      this.name = undefined;
      this.isAuth = false;
      // TEST - Purpose:
      // Avoid getting tasks from different logins /sessions in production
      const taskStore = useTaskStore();
      taskStore.tasks = [];
      taskStore.taskBeingEdited = undefined;
    },
    checkDarkMode() {
      if (this.darkMode) document.querySelector("html").className = "dark";
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.documentElement.className = this.darkMode ? "dark" : "";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "auth",
        storage: localStorage,
      },
    ],
  },
});
