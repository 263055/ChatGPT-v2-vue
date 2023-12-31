import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false})

const allUrl = ['/Login', '/ChatHome', '/Setting', '/order']

router.beforeEach((to, from, next) => {
    NProgress.start()
    const curUrl = to.path
    if (curUrl.includes('/register')) {
        next()
        return
    }
    if (curUrl !== '/404' && allUrl.indexOf(curUrl) === -1) {
        next('/404');
    } else {
        next()
    }
})

router.afterEach(() => {
    NProgress.done()
})
