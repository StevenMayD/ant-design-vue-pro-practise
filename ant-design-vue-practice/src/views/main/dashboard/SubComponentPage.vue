<template>
  <a-modal
    :visible="visible"
    :title="titleContent"
    @ok="handleOK"
    @cancel="handleCancel"
    cancelText="返回"
    okText="确认"
    width="600px"
  >
    <a-input v-model:value="inputContent" />
  </a-modal>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  props: {
    // 接收外界传参 option，类型为字符串
    options: {
      type: String,
      required: true,
      default: () => "你好666",
    },
  },
  emits: {
    // 向外通过SubComponentPagecCnfirm方法传值
    SubComponentPagecCnfirm: (value) => {
      return value;
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      titleContent: props.options,
      inputContent: "输入值",
    });
    const doShow = (item) => {
      state.visible = true;
      state.inputContent = item;
    };
    // 对话框点击确定
    const handleOK = () => {
      // 向外通过SubComponentPagecCnfirm方法传值
      emit("SubComponentPagecCnfirm", state.inputContent);
      state.visible = false;
    };
    // 对话框点击取消/叉叉
    const handleCancel = () => {
      state.visible = false;
    };
    return {
      ...toRefs(state),
      doShow,
      handleOK,
      handleCancel,
    };
  },
});
</script>
<style></style>
