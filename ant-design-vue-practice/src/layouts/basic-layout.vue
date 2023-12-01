<template>
  <a-layout style="min-height: 100vh">
    <!-- 设置header高度 -->
    <a-layout-header
      style="
        display: flex;
        align-items: center;
        height: 48px;
        padding-left: 14px;
      "
    >
      <div class="logo">
        <!-- 将svg作为字符串，来使用图片资源 -->
        <img :src="antdesign" />
        <!-- css样式 -->
        <span
          style="
            color: #fff;
            font-size: large;
            height: 48px;
            display: flex;
            align-items: center;
            padding-left: 10px;
          "
        >
          Ant Design Pro
        </span>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" theme="light" collapsible>
        <a-menu
          v-model:selectedKeys="menuSelectedKeys"
          v-for="(data, index) in menuData"
          v-bind:key="index"
          theme="light"
          mode="inline"
          @select="handleMenuSelect"
        >
          <a-sub-menu v-bind:key="data.key">
            <template #title>
              <span>
                <!-- 动态配置图标组件使用 component，不能直接使用 <DashboardOutlined /> -->
                <component :is="data.icon" />
                <span>{{ data.subMenu }}</span>
              </span>
            </template>
            <!-- 数组数据的加载方式都是v-for -->
            <a-menu-item
              v-for="itemData in data.menuItems"
              v-bind:key="itemData.key"
            >
              {{ itemData.itemName }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item
              v-for="(data, index) in breadcumbData"
              :key="index"
            >
              {{ data }}
            </a-breadcrumb-item>
          </a-breadcrumb>
          <div style="padding: 24px; background: #fff; min-height: 360px">
            标题内容,使用ref()进行响应式数据:{{ titleContent }}
            <div>
              <!-- 双向数据绑定(使用的数据mainContent本身又是响应式数据) -->
              <a-input v-model:value="titleContent"></a-input>
            </div>
            <br />
            主体内容,使用state进行响应式数据:{{ mainContent }}
            <div>
              <!-- 双向数据绑定(使用的数据mainContent本身又是响应式数据) -->
              <a-input v-model:value="mainContent"></a-input>
            </div>
            <br />
            来自computed计算属性:
            <br />{{ computedData }}<br /><br />
            来自watch监听器:
            <br />{{ watchData }}
          </div>
          <!-- 注意不是 @clicked -->
          <a-button type="primary" @click="loginClick">登录</a-button>
          <a-button type="primary" @click="modalClick">对话框</a-button>
          <a-modal
            :visible="visibleModal"
            title="基本弹窗"
            @ok="handleOK"
            @cancel="handleCancel"
            width="600px"
          >
            <p>some</p>
          </a-modal>
          <!-- 路由占位符: 用于加载子页面 -->
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router"; // 获取路由 与 路由跳转
import antdesign from "@/assets/antdesign.svg"; // 将svg作为字符串，来使用图片资源
import smdRequest from "../utils/request"; // 接口请求
import { computed } from "@vue/reactivity";
export default defineComponent({
  /* 组件 */
  components: {
    DashboardOutlined, // 使用图标组件
    FormOutlined,
    TableOutlined,
    TeamOutlined,
    FileOutlined,
  },
  /* props，接受外界数据：当外界的父组件的属性值发生变化时，这里子组件数据会相应更新 */
  props: {
    menuList: {
      type: Array,
      required: true, // 必须传值
      // 默认值
      default: () => {
        return [
          {
            subMenu: "仪表盘",
            key: "sub1",
            icon: "DashboardOutlined", // mock数据中加入图标
            menuItems: [
              { itemName: "分析页", key: "1" },
              { itemName: "监控页", key: "2" },
            ],
          },
          {
            subMenu: "表单页",
            key: "sub2",
            icon: "FormOutlined",
            menuItems: [
              { itemName: "基础表单", key: "3" },
              { itemName: "分布表单", key: "4" },
            ],
          },
          {
            subMenu: "列表页",
            key: "sub3",
            icon: "TableOutlined",
            menuItems: [
              { itemName: "搜索列表", key: "5" },
              { itemName: "查询表格", key: "6" },
              { itemName: "标准列表", key: "7" },
            ],
          },
          {
            subMenu: "详情页",
            key: "sub4",
            icon: "TeamOutlined",
            menuItems: [
              { itemName: "基础详情页", key: "8" },
              { itemName: "高级详情页", key: "9" },
            ],
          },
          {
            subMenu: "结果页",
            key: "10",
            icon: "FileOutlined",
            menuItems: [],
          },
        ];
      },
    },
  },
  /* 设置组件的初始状态  setup(props, { emit }){} */
  setup(props) {
    /* Setup的状态State：是组件内部私有的状态，可以用ref、reactive函数创建响应式变量
    ref和reactive 一样都是实现响应式数据的方法（ref针对基本数据类型，reactive用于对象数据类型）
    */
    const state = reactive({
      collapsed: false,
      menuSelectedKeys: ["1"], // 设置菜单默认选中项的key
      breadcumbData: ["仪表盘", "分析页"],
      mainContent: "主体内容",
      antdesign,
      menuData: ref(props.menuList),
      visibleModal: false,
    });
    const route = useRoute(); // 获取路由
    const router = useRouter(); // 路由跳转
    var titleContent = ref("标题内容");

    /* computed：计算属性, 根据依赖的响应式数据动态计算出一个新的值
    由于computedData本身不是响应式数据，不会随着titleConten和mainContent的变化而变化
    */
    // const computedData = titleContent.value + "-" + state.mainContent;
    const computedData = computed(() => {
      return titleContent.value + " ----- " + state.mainContent;
    });

    /* watch：监听器，用于观察特定的响应式数据，在监测到变化时，执行自定义的操作 
    由于一般情况下，响应式数据才会发生变化，所以watch用于监听响应式数据
    监听的是titleContent数据，watchData是自定义的操作，用于界面展示
    */
    var watchData = ref("");
    watch(titleContent, (newValue, oldValue) => {
      console.log(`titleContent从 ${oldValue} 变成了 ${newValue}`);
      watchData.value = `titleContent从 ${oldValue} 变成了 ${newValue}`;
    });

    /*  onMounted，在Vue实例已经被挂载到DOM上后会执行的操作 */
    onMounted(() => {
      // 请求数据
      getMainContent();
    });

    /* 自定义的方法（包括antdesign的组件方法和自定义方法） */
    // menu菜单点击事件
    const handleMenuSelect = ({ keyPath }) => {
      console.log("Clicked menu item key:", keyPath);
      /*
      [
        "sub3",
        "6"
      ]
      */
      // 点击菜单，调整面包屑的内容：找到menuData中的keyPath的数据，拼凑到breadcumbData中
      state.breadcumbData = [];
      for (const key in keyPath) {
        for (const item in state.menuData) {
          if (keyPath[key] == state.menuData[item].key) {
            state.breadcumbData.push(state.menuData[item].subMenu);
          }
          for (const menuItem in state.menuData[item].menuItems) {
            if (keyPath[key] == state.menuData[item].menuItems[menuItem].key) {
              state.breadcumbData.push(
                state.menuData[item].menuItems[menuItem].itemName
              );
            }
          }
        }
      }
    };
    // 页面主体内容请求
    const getMainContent = () => {
      smdRequest({
        url: "/customize-api/v3/date/is_work",
        method: "get",
        params: {},
      }).then((response) => {
        var responseData = response.data;
        state.mainContent = JSON.stringify(responseData.data); // 需要 state.
        titleContent.value = responseData.data.current; // 需要 .value
      });
    };
    // 点击登录
    const loginClick = () => {
      router.push({ path: "/login", query: { ...route.query } });
    };
    // 点击对话框
    const modalClick = () => {
      state.visibleModal = true;
    };
    // 对话框点击确定
    const handleOK = () => {
      state.visibleModal = false;
    };
    // 对话框点击取消/叉叉
    const handleCancel = () => {
      state.visibleModal = false;
    };

    /* setup()函数需要返回一个对象这个对象包含了组件中需要在模板中使用的属性方法等 */
    return {
      ...toRefs(state),
      handleMenuSelect,
      getMainContent,
      titleContent,
      computedData,
      watchData,
      loginClick,
      modalClick,
      handleOK,
      handleCancel,
    };
  },
});
</script>
<style>
.logo {
  height: 48px;
  display: flex;
  align-items: center;
  background: #141414;
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
