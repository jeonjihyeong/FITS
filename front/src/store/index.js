import Vue from 'vue'
import Vuex from 'vuex'
import anonymous from './modules/anonymous.js'
import auth from './modules/auth.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    anonymous,auth,
  }
})
