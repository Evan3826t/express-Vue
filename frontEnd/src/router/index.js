import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import about from '@/components/About'
import login from '@/components/Login'
import register from '@/components/Register'
import profiles from '@/components/user/Profiles'
import file from '@/components/File'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(Router)

const routes = [
  {
    path: '/home',
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
  }, {
    path: '/register',
    name: 'register',
    component: register
  }, {
  // profile page
    path: '/profiles',
    name: 'profiles',
    component: profiles
  }, {
  // file test
    path: '/file',
    name: 'file',
    component: file
  }

]
const router = new Router({mode: 'history', routes})

// 登入驗證
router.beforeEach((to, from, next) => {
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
