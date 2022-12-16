<template>
    <v-container>   
        <v-row class = "writeMemoTitle">
            노트 작성하기
        </v-row>
        <br><br>
        <v-row>
            <v-text-field
                outlined
                label="제목"
                v-model="title" 
                hide-details="false"
                class = 'writeMemoInputTitle mb-2'
            ></v-text-field>
        </v-row>
        <v-row>
            <v-textarea
                outlined
                label="내용"
                v-model="content" 
                class="writeMemoInputContent"
                height="500px"
            ></v-textarea>
        </v-row>
        <v-row>
            <v-spacer/>
            <v-btn
                class="pink lighten-1 white--text"
                v-on:click="noteWrite()"
                >작성하기</v-btn>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                title: '',
                content: '',
            }
        },methods: {
            ...mapActions({writeNote: "write"}),
            async noteWrite(){
                const reqData={
                    title:this.title,
                    content:this.content
                }
                await this.writeNote(reqData)
                this.$router.push('/')
            }
        },
    }
</script>

<style lang="scss" scoped>
.writeMemoTitle{
    font-size: 25px;
    font-weight: bold;
}
</style>