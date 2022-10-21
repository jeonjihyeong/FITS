<template>
    <v-container>   
        <v-row class = "writeMemoTitle">
            메모 작성하기
        </v-row>
        <br><br>
        <v-row>
            <v-text-field
                outlined
                label="제목"
                v-model="content" 
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
            <v-btn>작성하기</v-btn>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                content: '',
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