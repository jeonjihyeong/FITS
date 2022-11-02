<template>
    <v-row>    
        <v-col cols="11">
            <v-text-field
            label="댓글 입력"
            v-model="comment"
            hide-details="auto"
            color="pink lighten-2"
            />
        </v-col>
        <v-col cols="1">
            <v-btn 
            class="pink lighten-1 white--text mt-2"
            v-on:click="writeComment()">
                작성하기
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                comment: ''
            }
        },
        methods: {
            ...mapActions({
                commentWrite:"writeComment"
            }),
            async writeComment() {
                const reqInfo={
                    comment:this.comment,
                    noteIdx:this.$route.params.noteIdx
                }
                await this.commentWrite(reqInfo);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>