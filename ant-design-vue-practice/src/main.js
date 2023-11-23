import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "ant-design-vue/dist/antd.css";
import { Layout, Menu, SubMenu, Breadcrumb } from "ant-design-vue";

createApp(App)
  .use(store)
  .use(router)
  .use(Layout)
  .use(Menu)
  .use(SubMenu)
  .use(Breadcrumb)
  .mount("#app");
