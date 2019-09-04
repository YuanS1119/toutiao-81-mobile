import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      // console.log(state, user, 'store打印')
      state.user = user
    }
  },
  actions: {

  }
})
