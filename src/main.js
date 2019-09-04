import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.less'
import VeeValidate, {Validator} from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

Vue.use(Vant)
Vue.use(VeeValidate)
Validator.localize('zhCN',zhCN)
Vue.config.productionTip = false
// const vm =
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// console.log(vm.$toast)
