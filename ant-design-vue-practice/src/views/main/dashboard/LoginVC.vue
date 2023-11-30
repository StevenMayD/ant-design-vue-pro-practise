<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="手机号"
      name="phoneNum"
      :rules="[{ required: true, message: '请输入手机号!' }]"
    >
      <a-input v-model:value="formState.phoneNum" />
    </a-form-item>

    <a-form-item
      label="验证码"
      name="checkNum"
      :rules="[{ required: true, message: '请输入验证码!' }]"
    >
      <a-input-password v-model:value="formState.checkNum" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" @click="getCheckNum()">
        获取验证码
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
// import axios from "axios";
import { defineComponent, reactive } from "vue";
import smdRequest from "../../../utils/request"; // 接口请求
export default defineComponent({
  setup() {
    const formState = reactive({
      phoneNum: "",
      checkNum: "",
      remember: true,
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const getCheckNum = () => {
      /* 公共免费post请求地址：https://www.httpbin.org/post
        参数为body的JSON形式
        通常情况下，params 用于 URL 查询参数，而 data 或 body 用于 POST 请求的请求体。
        在 Axios 中，可以通过 data 字段发送请求体，而不是 params。

        获取验证码接口：https://coolapi.coolcollege.cn/user-center-api/v2/send_verification_code
      */
      const dataObject = {
        action_type: "login",
        login_mobile: formState.phoneNum,
      };
      smdRequest({
        url: "/post",
        method: "post",
        data: dataObject,
        headers: { "Content-Type": "application/json" }, // 参数作为 JSON 字符串形式发送
      }).then((response) => {
        const responseData = response.data;
        console.log("请求结果", responseData);
      });
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      getCheckNum,
    };
  },
});
</script>
