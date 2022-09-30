import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import about from '@/components/About'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})