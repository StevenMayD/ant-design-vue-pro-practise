import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "../layouts/basic-layout.vue";
import MonitoringPage from "../views/main/dashboard/MonitoringPage.vue";
import AnalysisPage from "../views/main/dashboard/AnalysisPage.vue";

const routes = [
  {
    // 默认展示（不拼接路由时，展示BasicLayout页面内容）
    path: "/",
    name: "BasicLayout",
    component: BasicLayout,
    children: [
      {
        // 默认展示
        path: "/",
        redirect: "/analysis", // 重定向到analysis页面
      },
      {
        // analysis展示AnalysisPage页面
        path: "/analysis",
        name: "AnalysisPage",
        component: AnalysisPage,
      },
      {
        path: "/monitoring",
        name: "MonitoringPage",
        component: MonitoringPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
