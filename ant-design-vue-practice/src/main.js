import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "ant-design-vue/dist/antd.css";
import {
  Layout,
  Menu,
  SubMenu,
  Breadcrumb,
  Input,
  Button,
  Form,
  Checkbox,
  Modal,
} from "ant-design-vue";

createApp(App)
  .use(store)
  .use(router)
  .use(Layout)
  .use(Menu)
  .use(SubMenu)
  .use(Breadcrumb)
  .use(Input)
  .use(Button)
  .use(Form)
  .use(Checkbox)
  .use(Modal)
  .mount("#app");
