import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "current" },
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "current",
        name: "current",
        component: () => import("../views/TasksCurrent.vue"),
      },
      {
        path: "future",
        name: "future",
        component: () => import("../views/TasksFuture.vue"),
      },
      {
        path: "archived",
        name: "archived",
        component: () => import("../views/TasksArchived.vue"),
      },
    ],
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
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
