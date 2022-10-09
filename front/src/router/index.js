import Vue from 'vue'
import VueRouter from 'vue-router'
import signIn from '../views/signIn.vue'
import mainHome from '../views/mainHome.vue'
import signUp from '../views/signUp.vue'
import findId from '@/views/findId.vue'
import findPw from '@/views/findPw.vue'

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
  {
    path: '/signUp',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/findId',
    name: 'findId',
    component: findId
  },
  {
    path: '/findPw',
    name: 'findPw',
    component: findPw
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
