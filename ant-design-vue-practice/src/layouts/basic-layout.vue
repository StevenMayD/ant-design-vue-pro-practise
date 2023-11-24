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
          v-model:selectedKeys="selectedKeys"
          v-for="(data, index) in menuData"
          v-bind:key="index"
          theme="light"
          mode="inline"
        >
          <a-sub-menu v-bind:key="data.key">
            <template #title>
              <span>
                <!-- {{ data.icon }} -->
                <span>{{ data.subMenu }}</span>
              </span>
            </template>
            <!-- 数组数据的加载方式都是v-for -->
            <a-menu-item
              v-for="itemData in data.menuItems"
              v-bind:key="itemData.key"
              v-show="itemData == null"
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
            Bill is a cat.
          </div>
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
import { defineComponent, ref } from "vue";
import antdesign from "@/assets/antdesign.svg"; // 将svg作为字符串，来使用图片资源
export default defineComponent({
  components: {},
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(["1"]),
      antdesign,
      breadcumbData: ref(["仪表盘", "分析页"]),
      menuData: ref([
        {
          subMenu: "仪表盘",
          key: "sub1",
          icon: DashboardOutlined,
          menuItems: [
            { itemName: "分析页", key: "1" },
            { itemName: "监控页", key: "2" },
          ],
        },
        {
          subMenu: "表单页",
          key: "sub2",
          icon: FormOutlined,
          menuItems: [
            { itemName: "基础表单", key: "3" },
            { itemName: "分布表单", key: "4" },
          ],
        },
        {
          subMenu: "列表页",
          key: "sub3",
          icon: TableOutlined,
          menuItems: [
            { itemName: "搜索列表", key: "5" },
            { itemName: "查询表格", key: "6" },
            { itemName: "标准列表", key: "7" },
          ],
        },
        {
          subMenu: "详情页",
          key: "sub4",
          icon: TeamOutlined,
          menuItems: [
            { itemName: "基础详情页", key: "8" },
            { itemName: "高级详情页", key: "9" },
          ],
        },
        {
          subMenu: "结果页",
          key: "10",
          icon: FileOutlined,
          menuItems: [],
        },
      ]),
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
