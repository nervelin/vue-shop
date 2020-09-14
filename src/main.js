import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标css
import './assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
// 配置基地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 在请求头中挂载token令牌
axios.interceptors.request.use(function(config) {
    config.headers.Authorization = sessionStorage.getItem("token")
    return config;
}, function(error) {
    return Promise.reject(error);
});
Vue.config.productionTip = false
    // 将axios当做一个属性挂载给vue函数的原型上
Vue.prototype.$http = axios
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')