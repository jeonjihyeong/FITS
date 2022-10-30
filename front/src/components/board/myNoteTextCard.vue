<template>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        <div>카테고리</div>
        <p class="text-h4 text--primary">
          제목
        </p>
        <p>쓴사람</p>
        <div class="text--primary">
          내용
        </div>
      </v-card-text>
      <v-card-actions
      backgroundColor="pink">
        <router-link :to="{path:`/note/view/${noteIdx}`}">
            <v-btn
                text
                color="pink lighten-1"
                >
                더보기
            </v-btn>
        </router-link>
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
        props: ['noteIdx']

    }
</script>

<style lang="scss" scoped>
</style>