<template>
    <div>
        <v-card>
              <v-img
                src='../../../../../카카오톡 받은 파일/KakaoTalk_20220501_174338657_01.jpg'
                class="white--text align-end"
                height="200px"
              >
                <v-card-title v-text="hello"></v-card-title>
              </v-img>
  
              <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn icon
                    color="pink lighten-1">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
  
                <v-btn icon
                    color="pink lighten-1"
                    @click="marker=!marker">
                  <v-icon v-if="marker">mdi-bookmark</v-icon>
                  <v-icon disabled v-if="!marker">mdi-bookmark</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hello:"ㅎㅇㅎㅇ",
                marker: Boolean,
                like: Boolean,
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>