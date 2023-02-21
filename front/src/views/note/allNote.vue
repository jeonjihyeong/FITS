<template>
    <v-container>
        <v-row
            class="allNoteTitle">
            전체 스터디 노트
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <router-link to="/note/write">
                <v-btn
                    color="pink lighten-1"
                    text
                    class="writeMemoBtn"
                    >
                    글쓰기
                </v-btn>
            </router-link>
            </v-row>
        <v-row>
            <v-col cols="6" v-for="(item, index) in allNoteInfo" :key="index">
                <MyNoteCard 
                :title='item.title'
                :noteIdx = 'item.noteIdx'
                :like = 'item.likes'/>
            </v-col>
        </v-row>
        <br>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        color="pink lighten-1"
        @input = "handlePage"
      ></v-pagination>
    </div>
    {{page}}
    </v-container>
</template>

<script>
import MyNoteCard from '@/components/board/myNoteCard.vue';
import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                allNoteInfo:{},
                length:6,
                page:1,
                
            }
        },
        created() {
            this.getNote();
        },
        methods: {
            ...mapActions({
                get: "getNote",
                logOut:"dropToken"
            }),
            async getNote() {
                try{
                    const result = await this.get(this.page);
                    // if(result ==='만료된 토큰입니다.'||result=='유효하지 않은 토큰입니다.'){
                    //     this.logOut();
                    //     this.$router.push('/');
                    // }
                this.allNoteInfo ={...result.data.rows}
                this.length=Math.ceil(result.data.count/result.paginate.limit)
                console.log(this.allNoteInfo)
                console.log(result);
                }catch(err){
                    console.log(err)
                }
            },
            async handlePage(){
                this.getNote();
            }
        },
        components: { MyNoteCard}
}
</script>

<style lang="scss" scoped>
.allNoteTitle{
    justify-content: left;
    margin-bottom:20px;
    font-size:28px;
    font-weight: bold;
    margin-left:3px
}
.writeMemoBtn{
    font-size: 17px;
    font-weight: bolder;
}
</style>