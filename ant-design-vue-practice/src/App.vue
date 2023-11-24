<template>
  <a-layout style="min-height: 100vh">
    <!-- 设置header高度 -->
    <a-layout-header
      style="
        background: #141414;
        height: 48px;
        padding: 0px;
        vertical-align: middle;
      "
    >
      <div class="logo">
        <!-- 将svg作为字符串，来使用图片资源 -->
        <img
          :src="antdesign"
          alt=""
          style="padding-top: 8px; padding-left: 14px; vertical-align: top"
        />
        <!-- css样式 -->
        <span style="color: #fff; padding: 10px; vertical-align: middle">
          Ant Design Pro
        </span>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" theme="light" collapsible>
        <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <DashboardOutlined />
                <span>仪表盘</span>
              </span>
            </template>
            <a-menu-item key="1">分析页</a-menu-item>
            <a-menu-item key="2">监控页</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <FormOutlined />
                <span>表单</span>
              </span>
            </template>
            <a-menu-item key="3">基础表单</a-menu-item>
            <a-menu-item key="4">分布表单</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <TableOutlined />
                <span>列表</span>
              </span>
            </template>
            <a-menu-item key="5">搜索列表</a-menu-item>
            <a-menu-item key="6">查询表格</a-menu-item>
            <a-menu-item key="7">标准列表</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <template #title>
              <span>
                <team-outlined />
                <span>详情页</span>
              </span>
            </template>
            <a-menu-item key="8">基础详情页</a-menu-item>
            <a-menu-item key="9">高级详情页</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="10">
            <file-outlined />
            <span>结果页</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
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
  components: {
    DashboardOutlined,
    FormOutlined,
    TableOutlined,
    TeamOutlined,
    FileOutlined,
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(["1"]),
      antdesign,
    };
  },
});
</script>
<style>
.logo {
  height: 48px;
  /* margin: 0px; */
  padding-top: 0px;
  /* background: rgba(255, 255, 255, 0.3); */
  background: #141414;
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
