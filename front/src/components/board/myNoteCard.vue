<template>
    <v-card>
        <router-link :to="{path:`/note/view/${noteIdx}`}">
            <v-img
            src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTExMTJfMTI1%2FMDAxNjM2NzI1NjE4NjQw.GEewoww7BRhJBXexutXVeX_GLWvW96Im9i6sHNaZObcg.QBOiFhHfK86jeQL1PTru8HRqdeooyyU-EzWDeiS_7fgg.JPEG.ho0605%2F20211112_111322.jpg&type=sc960_832'
            class="white--text align-end"
            height="200px"
            >
            <v-card-title v-text="title"></v-card-title>
            </v-img>
        </router-link>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon
                v-if="heart"
                color="pink lighten-1"
                @click="$event => noteLike()">
                <v-icon>mdi-heart</v-icon>
                {{like.length}}
            </v-btn>
            <v-btn icon
                v-if="!heart"
                color="pink lighten-1"
                @click="$event => noteLikeCancle()">
                <v-icon disabled>mdi-heart</v-icon>
                {{like.length}}
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
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                marker: Boolean,
                heart: false,
            }
        },

        created () {
            this.checkLike(this.like);
        },

        computed: {
            ...mapState({
            userInfo:state=>state.anonymous.userInfo
            })
        },

        methods: {
            ...mapActions({
                noteLike:'noteLike',
                noteLikeCancle: 'noteLikeCancle'
            }),

            async noteLike(){
                try{
                    await this.noteLike(this.noteIdx)
                }catch(err){
                    console.log(err)
                }
            },
            
            async noteLikeCancle(){
                try{
                    await this.noteLikeCancle(this.noteIdx)
                }catch(err){
                    console.log(err)
                }
            },
            
            checkLike(like) {
                if(like.length===0){
                    return
                }
                let index;
                for(index = 0 ; index<=like.length ; index++){
                    if(like[index].userIdx===this.userInfo.userIdx){
                        return this.heart = true
                    }
                }
                return
            },
        },
        props: ['title','noteIdx','like'],
    }
</script>

<style lang="scss" scoped>

</style>