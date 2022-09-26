<template>
  <v-app id="inspire">
 

    <v-app-bar app color="pink lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>

      <v-toolbar-title
      class="logo"
      >
        <img src="../assets/가로/new/007.png" width="130px">
      </v-toolbar-title>
      <v-btn icon>
        <v-icon color="white">{{icons.mdiAccount}}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
    <router-link to="/">gd</router-link>
    </v-navigation-drawer>
    <br><br><br><br>
    <v-container>
      <router-view />
    </v-container>
    <!-- <v-main class="blue lighten-2">
      <v-container>
        <v-row>
          <template v-for="n in 4">
            <v-col
              :key="n"
              class="mt-2"
              cols="12"
            >
              <strong>Category {{ n }}</strong>
            </v-col>

            <v-col
              v-for="j in 6"
              :key="`${n}${j}`"
              cols="6"
              md="2"
            >
              <v-sheet height="150"></v-sheet>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main> -->
  </v-app>
</template>

<script>
  import {
    mdiAccount,
  } from '@mdi/js'
  export default {
    data: () => ({ 
      drawer: null,
      icons: {
        mdiAccount,
        } }),
    
  }
</script>
<style>
  .logo{
    text-align: center;
    justify-content: center;
    margin: auto;
    margin-top: auto;
  }
</style>