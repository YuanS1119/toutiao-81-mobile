import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storageTools.getItem('user')
  },
  mutations: {
    setUser (state, user) {
      // console.log(state, user, 'store打印')
      state.user = user
      storageTools.setItem('user', user)
    }
  },
  actions: {

  }
})
