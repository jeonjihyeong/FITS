import Vue from 'vue'
import VueRouter from 'vue-router'
import signIn from '../views/signIn.vue'
import mainHome from '../views/mainHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: mainHome
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: signIn
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
