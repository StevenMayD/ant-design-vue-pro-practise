<template>
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
  <a-button type="primary" @click="modalClick">对话框</a-button>
  <a-button type="primary" @click="addSubComponentPage">
    展示子组件页面
  </a-button>
  <!-- 封装子组件页面
    父组件调用子组件的方法需要使用 ref 引用子组件
    通过子组件的props，父组件对其进行传参，参数名options
    接收子组件的回调SubComponentPagecCnfirm，回调方法是 SubComponentPageCallback
  -->
  <SubComponentPage
    ref="SubComponentPageRef"
    :options="optionsValue"
    @SubComponentPagecCnfirm="SubComponentPageCallback"
  />
  <a-modal
    :visible="visibleModal"
    :title="titleContent"
    @ok="handleOK"
    @cancel="handleCancel"
    cancelText="取消啦"
    okText="确认无误"
    width="600px"
  >
    <p>some</p>
  </a-modal>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, onMounted, watch } from "vue";
import antdesign from "@/assets/antdesign.svg"; // 将svg作为字符串，来使用图片资源
import smdRequest from "../../../utils/request"; // 接口请求
import { computed } from "@vue/reactivity";
import store from "@/store";
import SubComponentPage from "../dashboard/SubComponentPage.vue";
export default defineComponent({
  /* 组件 */
  components: {
    SubComponentPage,
  },
  /* props，接受外界数据：当外界的父组件的属性值发生变化时，这里子组件数据会相应更新 */
  props: {},
  /* 设置组件的初始状态  setup(props, { emit }){} */
  setup(props) {
    /* Setup的状态State：是组件内部私有的状态，可以用ref、reactive函数创建响应式变量
    ref和reactive 一样都是实现响应式数据的方法（ref针对基本数据类型，reactive用于对象数据类型）
    */
    const state = reactive({
      mainContent: "主体内容",
      antdesign,
      menuData: ref(props.menuList),
      visibleModal: false,
      optionsValue: "来自父页面的传值111",
    });
    var titleContent = ref("标题内容");
    const SubComponentPageRef = ref(null); // 使用ref引用子组件，父组件就可以调用子组件的方法

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
        /* store：全局保存数据，进行没有直接关系的界面见传值，类似NSUserDefault */
        store.state.titleGlobal = titleContent.value; //
      });
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
    // 展示子组件页面：通过调用子组件的doShow，让其显示并传值
    const addSubComponentPage = () => {
      /* 在Vue3中，父组件调用子组件的方法需要使用 ref 引用子组件，
      并使用 .value 访问子组件实例来调用其方法，并传参
      */
      SubComponentPageRef.value.doShow("来自父页面的传值222");
    };
    // 子组件页面回调数据
    const SubComponentPageCallback = (value) => {
      state.mainContent = value;
    };
    /* setup()函数需要返回一个对象这个对象包含了组件中需要在模板中使用的属性方法等 */
    return {
      ...toRefs(state),
      getMainContent,
      titleContent,
      computedData,
      watchData,
      modalClick,
      handleOK,
      handleCancel,
      addSubComponentPage,
      SubComponentPageRef,
      SubComponentPageCallback,
    };
  },
});
</script>
<style></style>
