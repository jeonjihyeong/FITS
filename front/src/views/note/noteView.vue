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
        </v-row>
        <WriteComment></WriteComment>
    </v-container>
</template>

<script>
import WriteComment from '@/components/board/writeComment.vue';
import { mapActions } from 'vuex';

    export default {
    data() {
        return {
            noteInfo: {}
        };
    },
    methods: {
        ...mapActions({
            getNote: "getOneNote"
        }),
        async getOneNote() {
            const noteIdx = this.$route.params.noteIdx;
            const result = await this.getNote(noteIdx);
            console.log("컴포넌트 응답 확인");
            this.noteInfo = result;
        }
    },
    created() {
        this.getOneNote();
    },
    components: { WriteComment }
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
</style>