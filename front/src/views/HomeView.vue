<template>
  <v-app id="inspire">
 

    <v-app-bar app color="pink lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>

      <v-toolbar-title
      class="logo"
      >
        <router-link to="/"><img src="../assets/가로/new/007.png" width="130px"></router-link>
      </v-toolbar-title>
        <router-link v-if="this.accessToken" to="/user/myInfo"><v-btn icon><v-icon color="white">{{icons.mdiAccount}}</v-icon></v-btn></router-link>
        <router-link v-if="!this.accessToken" to="/auth/logIn"><v-btn icon><v-icon color="white">{{icons.mdiAccount}}</v-icon></v-btn></router-link>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
    <br><br>
    <router-link to="/"><div class="navDrawer">홈</div></router-link><br>
    <router-link to="/note/list"><div class="navDrawer">전체 스터디 글</div></router-link><br>
    <router-link to="/note/best"><div class="navDrawer">인기 스터디 글</div></router-link><br>
    <router-link to="/note/my"><div class="navDrawer">내 스터디 글</div></router-link><br>
    </v-navigation-drawer>
    <br><br><br><br>
    <v-row class="main">
      <router-view />
    </v-row>
    
      <Footer ></Footer>
  </v-app>
</template>

<script>
  import {
    mdiAccount,
  } from '@mdi/js'
  import Footer from '@/components/Footer/Footer.vue';
  import {mapState} from 'vuex'
  export default {
    data: () => ({
        drawer: null,
        icons: {
            mdiAccount,
        },
    }),
    components: { Footer },
    computed: {
      ...mapState({
        accessToken:state=>state.anonymous.accessToken
      })
    },
}
</script>
<style>
  .logo{
    text-align: center;
    justify-content: center;
    margin: auto;
    margin-top: auto;
  }
  .navDrawer{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
    color: black;
  }
  a{
  text-decoration: none;
}
  .card{
    border: 1px solid black;
  }
  
  .main{
    padding: auto;
    vertical-align: center;
    min-height: 500px;
    height: auto;
    margin-bottom: 20px;
    justify-content: center;
    margin-left:10px
  }
 
</style>