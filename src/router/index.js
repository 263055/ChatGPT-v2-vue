import VueRouter from 'vue-router'
import Router from 'vue-router'

import ChatHome from '../view/pages/chatHome/index.vue'
import Setting from '../view/pages/setting/setting.vue'
import Login from '../view/pages/user/login.vue'

import Vue from 'vue'

Vue.use(Router)

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/Login",
        },
        {
            path: "/ChatHome",
            name: "ChatHome",
            component: ChatHome,
        },
        {
            path: "/Setting",
            name: "Setting",
            component: Setting
        },
        {
            path: "/Login",
            name: "Login",
            component: Login
        },
        {
            path: '/404',
            component: () => import('@/view/error/404'),
            hidden: true
        },
    ]
})

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location) {
    return routerReplace.call(this, location).catch(err => err)
}
