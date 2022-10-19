import { defineStore } from "pinia";
import { logIn, logOut, signUp } from "../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    userId: undefined,
    email: undefined,
    // TODO
    // name: undefined,
    // reviewDay: "sun",
    // theme: "light",
    // priorityStyle: "1mtd"
  }),
  actions: {
    signup() {
      const userId = await signUp(email, password);
      this.userId = userId;
      this.email = email;
      this.isAuth = true;
    },
    async logIn(email, password) {
      const userId = await logIn(email, password);
      this.userId = userId;
      this.email = email;
      this.isAuth = true;
    },
    async logOut() {
      this.userId = undefined;
      this.email = undefined;
      this.name = undefined;
      this.isAuth = false;
      await logOut();
    },
  },
});
