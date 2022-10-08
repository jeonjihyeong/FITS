<template>
    <v-container
        class="findIdContainer"
        justify-center>
        <v-row
            class="findIdTitle">
            아이디 찾기
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    label="이름 입력"
                    v-model="name"
                    hide-details="auto"
                    color="pink lighten-1"
                />
                <v-text-field
                    label="이메일 입력"
                    v-model="email"
                    hide-details="auto"
                    color="pink lighten-1"
                />
                <v-btn
                    class="pink lighten-1 white--text mt-2 findIdbtn"
                    v-on:click="findId()">
                    아이디 찾기
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                name: '',
                email:'',
            }
        },
        methods: {
            ...mapActions({
                findIdMail:"findIdMail"
            }),
            findId() {
                confirm("아이디를 찾으시겠습니까?")
                const reqInfo={
                    name:this.name,
                    email:this.email
                }
                this.findIdMail(reqInfo)    
            }
        },
    }
</script>

<style lang="scss" scoped>
.findIdTitle{
    margin-top: 25%;        
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
}
.findIdContainer{
    width: 60%;
}
.findIdbtn{
    width: 100%
}
</style>