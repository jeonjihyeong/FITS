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
import noteView from '@/views/note/noteView.vue'
import myInfo from '@/views/user/myInfo.vue'
import writeNote from '@/views/note/writeNote.vue'
import noteLayout from '@/views/note/noteLayout.vue'
import updateInfo from '@/views/user/updateInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: mainHome,
    
  },
  // auth router
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
    path:'/note',
    // name:'note',//
    component: noteLayout,
    beforeEnter:(to,from,next)=>{
      console.log("로그인 상태 체크");
      if(localStorage.getItem("accessToken")){
        console.log("로그인 중")
        next();
        return;
      }
      console.log("로그인을 해주세요")
      alert("로그인을 해주세요")
      return;
    },
    children:[
      {
        path:`list`,
        name: 'allNote',
        component:allNote
      },
      {
        path:'my',
        name:'myNote',
        component:myNote
      },
      {
        path:'best',
        name:'bestNote',
        component:myNote
      },
      {
        path:'write',
        name:'writeNote',
        component:writeNote
      },
      {
        path:'view/:noteIdx',
        name:'viewNote',
        component:noteView,
        // props: route => ({
        //   noteIdx: Number(route.params.noteIdx)
        // })
      }
    ]
  },  
  {
    path: '/user/myInfo',
    name: 'myInfo',
    component: myInfo,
    beforeEnter:(to,from,next)=>{
      console.log("로그인 상태 체크");
      if(localStorage.getItem("accessToken")){
        console.log("로그인 중")
        next();
        return;
      }
      console.log("로그인을 해주세요")
      alert("로그인을 해주세요")
      return;
    },
  },
  {
    path: '/user/update',
    name: 'updateInfo',
    component:updateInfo
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
