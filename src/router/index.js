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
      name: 'search',
      path: '/search',
      component: () => import('../views/search')
    },
    {
      path: '/search-result/:q',
      name: 'search-result',
      // 路由跳转的时候对，对应的组件把动态路由参数，传递给组件
      props: true,
      component: () => import(/* webpackChunkName: "search-result" */ '../views/search/searchResult.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    }
  ]
})
