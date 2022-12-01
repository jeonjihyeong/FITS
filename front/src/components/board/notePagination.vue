<template>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        color="pink lighten-1"
      ></v-pagination>
    {{page}}
    </div>
  </template>
  
  <script>
    export default {
      data () {
        return {
          page:1
        }
      },
      props: ['length']
    }
  </script>