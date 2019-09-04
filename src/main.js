import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.less'
import VeeValidate from 'vee-validate'

Vue.use(Vant)
Vue.use(VeeValidate)
Vue.config.productionTip = false
// const vm =
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// console.log(vm.$toast)
