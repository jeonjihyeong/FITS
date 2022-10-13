import Vue from 'vue'
import VueRouter from 'vue-router'
import signIn from '../views/signIn.vue'
import mainHome from '../views/mainHome.vue'
import signUp from '../views/signUp.vue'
import findId from '@/views/findId.vue'
import findPw from '@/views/findPw.vue'
import myNote from '@/views/myNote.vue'
import allNote from '@/views/allNote.vue'
import memoView from '@/views/memoView.vue'

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
  {
    path: '/Note/my',
    name: 'myNote',
    component: myNote
  },
  {
    path: '/Note',
    name: 'allNote',
    component: allNote
  },
  {
    path: '/memo/:memoNumber',
    name: 'memo',
    component: memoView
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
