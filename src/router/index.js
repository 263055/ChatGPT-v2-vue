import VueRouter from 'vue-router'

import ChatHome from '../view/pages/chatHome/index.vue'
import Setting from '../view/pages/setting.vue'
import Login from '../view/pages/user/login.vue'

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
        }
    ]
})
