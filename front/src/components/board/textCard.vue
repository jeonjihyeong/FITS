<template>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        <div>{{category}}</div>
        <p class="text-h4 text--primary">
          {{title}}
        </p>
        <p>{{writer}}</p>
        <div class="text--primary">
          {{content}}
        </div>
      </v-card-text>
      <v-card-actions
      backgroundColor="pink">
        <v-btn
          text
          color="pink lighten-1"
        >
          더보기
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            text
            color="pink lighten-1" 
            v-on:click="like=!like">
            <v-icon v-if='like'>mdi-heart</v-icon>
            <v-icon v-if='!like' disabled>mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                like:Boolean,
            }
        },

        props:['category','title','writer','content']
    }
</script>

<style lang="scss" scoped>
</style>