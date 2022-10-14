import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import about from '@/components/About'
import login from '@/components/Login'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/about',
    name: 'about',
    component: about
  }, {
    path: '/login',
    name: 'login',
    component: login
  }
]
const router = new Router({routes})

// 登入驗證
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === null || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
