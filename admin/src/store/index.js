import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { initUser } from './types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'


export default new Vuex.Store({
  state: {
    userInfo: initUser(),
  },
  getters,
  mutations,
  actions,
  modules: {
  }
})
