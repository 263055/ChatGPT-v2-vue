import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false})

const allUrl = ['/Login', '/ChatHome', '/Setting']

router.beforeEach((to, from, next) => {
    NProgress.start()
    const curUrl = to.path
    console.log(curUrl)
    if (curUrl !== '/404' && allUrl.indexOf(curUrl) === -1) {
        next('/404');
    } else {
        next()
    }
})

router.afterEach(() => {
    NProgress.done()
})
