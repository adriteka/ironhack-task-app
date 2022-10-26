import { defineStore } from "pinia";
import { signUp, logIn, logOut } from "../api";

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
      console.log("logged out");
      this.userId = undefined;
      this.email = undefined;
      this.name = undefined;
      this.isAuth = false;
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
