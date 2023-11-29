import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "../layouts/basic-layout.vue";
import LoginVC from "../views/main/dashboard/LoginVC.vue";

const routes = [
  {
    // 默认地址
    path: "/",
    name: "BasicLayout",
    component: BasicLayout,
    children: [
      {
        path: "/login",
        name: "LoginVC",
        component: LoginVC,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
