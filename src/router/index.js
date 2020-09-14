import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import login from '../components/login.vue'
// 导入home组件
import home from '../components/home.vue'
Vue.use(VueRouter)

const routes = [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: login }, //登录组件
    { path: '/home', component: home } //home组件

]

const router = new VueRouter({
        routes
    })
    // 防止用户没有登录也可以访问其他页面，路由导航的前置守卫
router.beforeEach((to, from, next) => {
    // 如果访问/login，直接放行
    if (to.path == '/login') {
        next()
    } else {
        // 如果访问其他页面，先判断有没有token，如果有则直接放行，如果没有，强行跳转到登录页面
        const token = sessionStorage.getItem("token")
        console.log(token);
        if (!token) return next("/login")
        next()
    }


})
export default router