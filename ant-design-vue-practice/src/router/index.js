import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "../layouts/basic-layout.vue";

const routes = [
  {
    // 默认地址
    path: "/",
    name: "BasicLayout",
    component: BasicLayout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
