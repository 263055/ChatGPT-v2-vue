import {loginAndRegister, resetPassword} from '@/api/login'
import {getToken, removeToken, setToken} from '@/util/auth'
import {Notification} from 'element-ui'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        permissions: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },

    actions: {
        // 登录
        Login({commit}, userInfo) {
            const email = userInfo.email.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                loginAndRegister(email, password, code, uuid).then(res => {
                    if (res.data != null) {
                        setToken(res.data)
                        Notification.success({
                            title: '登陆成功',
                            message: '点击左侧栏的切换即可进行对话',
                            duration: 3000
                        })
                        commit('SET_TOKEN', res.data)
                        resolve()
                    } else {
                        Notification.success({
                            title: '邮件已发送',
                            message: '请点击邮箱的连接完成注册',
                            duration: 5000
                        })
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        Logout({commit}) {
            commit('SET_TOKEN', '')
            removeToken()
        },

        // 重置密码
        resetPassword({commit}, userInfo) {
            const email = userInfo.email.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                resetPassword(email, password, code, uuid).then(() => {
                    Notification.success({
                        title: '邮件已发送',
                        message: '请点击邮箱的连接完成密码的重置',
                        duration: 5000
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default user
