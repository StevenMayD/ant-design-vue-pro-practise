const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { // 配置开发服务器
    proxy: { // 代理
      "/customize-api": { // 拦截以 /customize-api开头的请求路径
        target: "https://coolapi.coolcollege.cn/", // 将 /customize-api开头的请求代理到目标服务器
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          // '^/customize-api': '' // 将 /customize-api 替换为空字符串
        }
      },
    },
  },
});
