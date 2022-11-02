<template>
    <v-container>
        <v-row
            class="noteViewTitle"
            justify-center>
            게시글
        </v-row>
        
        <v-row>
        <v-col cols="12" class="noteTitle">
            {{noteInfo.title}}
        </v-col>
        <v-col cols="12" class="noteContent">
            {{noteInfo.content}}
        </v-col>
        <v-col cols="10"></v-col>
        <v-col cols="2" class="buttons">
            <v-btn 
                class="pink lighten-1 white--text"
                v-on:click="updateNote()">
                수정
            </v-btn>
            <v-btn class="pink lighten-1 white--text"
                v-on:click="deleteNote()">
                삭제
            </v-btn>
        </v-col>
        
        
        </v-row>
        <WriteComment class="mb-1"></WriteComment>
        <CommentView v-for="(item, index) in commentInfo" :key="index"
            :writer='item.user.name'
            :comment='item.comment'
            :created='item.created.substring(0,10)'>
        {{item.created}}</CommentView>
            
    </v-container>
</template>

<script>
import CommentView from '@/components/board/commentView.vue';
import WriteComment from '@/components/board/writeComment.vue';

import { mapActions } from 'vuex';

    export default {
    data() {
        return {
            noteInfo: {},
            commentInfo: {},
        };
    },
    methods: {
        ...mapActions({
            getNote: "getOneNote",
            delete:"deleteNote",
        }),
        async getOneNote() {
            try{
                const noteIdx = this.$route.params.noteIdx;
                const result = await this.getNote(noteIdx);
                console.log("컴포넌트 응답 확인");
                this.noteInfo = result.noteInfo;
                this.commentInfo = result.comment;
            }catch(err){
                console.log(err);
            }
        },
        async deleteNote(){
            try{
                const noteIdx = this.$route.params.noteIdx;
                if(await this.delete(noteIdx)==="success"){
                    this.$router.push('/')
                }
            }catch(err){
                console.log(err);
            }
        },
    },
    created() {
        this.getOneNote();
    },
    components: { WriteComment, CommentView}
}
</script>

<style lang="scss" scoped>
.noteViewTitle{
    justify-content: left;
    margin-bottom:20px;
    font-size:28px;
    font-weight: bold;
    margin-left:3px
}
.noteTitle{
    font-size: 20px;
    border:1px solid #ccc;
    margin-bottom:10px;
}
.noteContent{
    font-size: 20px;
    border:1px solid #ccc;
    min-height: 500px;
}
.buttons{
    text-align: right;
}
</style>