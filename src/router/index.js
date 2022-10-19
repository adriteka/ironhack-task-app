import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    redirect: { name: "login" },
    component: () => import("../views/Auth.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("../views/Login.vue"),
      },
      {
        path: "signup",
        name: "signup",
        component: () => import("../views/Signup.vue"),
      },
          // TODO Bonus
    // {
    //   path: "forgot",
    //   name: "forgot",
    //   component: () => import("../views/Forgot.vue"),
    // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
