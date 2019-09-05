import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '../views/Tabber'
import home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
    {
      name: 'tabbar',
      path: '/',
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '',
          component: home
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    }
  ]
})
