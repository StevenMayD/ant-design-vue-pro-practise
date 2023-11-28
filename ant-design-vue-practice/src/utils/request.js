import axios from "axios";

function smdRequest(options) {
  return axios(options)
    .then((res) => {
      // 请求成功 直接返回
      return res;
    })
    .catch((error) => {
      // 请求失败 控制台打印
      console.error("request error", error);
      return Promise.reject(error); // 方法返回一个带有拒绝原因的Promise对象
    });
}

export default smdRequest;
