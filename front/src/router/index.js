import Vue from 'vue'
import VueRouter from 'vue-router'
import userLayout from '@/views/user/userLayout.vue'
import signIn from '../views/auth/signIn.vue'
import mainHome from '../views/main/mainHome.vue'
import signUp from '../views/auth/signUp.vue'
import findId from '@/views/auth/findId.vue'
import findPw from '@/views/auth/findPw.vue'
import myNote from '@/views/note/myNote.vue'
import allNote from '@/views/note/allNote.vue'
import memoView from '@/views/note/memoView.vue'
import myInfo from '@/views/user/myInfo.vue'
import writeMemo from '@/views/note/writeMemo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: mainHome
  },
  {
    path:'/auth',
    name: 'auth',
    component:userLayout,
    beforeEnter:(to,from,next)=>{
      console.log("로그인 상태 체크");
      if(localStorage.getItem("accessToken")){
        console.log("로그인 상태")
        return;
      }
      console.log("로그아웃 상태")      
      next()
    },
    children:[
    {
      path:"login",
      name:'login',
      component: signIn
    },
    {
      path:"signUp",
      name:'signUp',
      component: signUp
    },
    {
      path:"findId",
      name:'findId',
      component: findId
    },
    {
      path:"findPw",
      name:'findPw',
      component: findPw
    },
  ]
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
    path: '/memo/view/:memoNumber',
    name: 'memo',
    component: memoView
  },
  {
    path: '/user/myInfo',
    name: 'myInfo',
    component: myInfo
  },
  {
    path: '/memo/write',
    name: 'writeMemo',
    component: writeMemo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
