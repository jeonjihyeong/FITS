<template>
    <v-container
        class="findPwContainer"
        justify-center>
        <v-row
            class="findPwTitle">
            비밀번호 찾기
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    label="아이디 입력"
                    v-model="name"
                    hide-details="auto"
                    color="pink lighten-1"
                />
                <v-text-field
                    label="이름 입력"
                    v-model="id"
                    hide-details="auto"
                    color="pink lighten-1"
                />
                <v-text-field
                    label="이메일 입력"
                    v-model="email"
                    hide-details="auto"
                    color="pink lighten-1"
                /><br>
                <v-btn
                    class="pink lighten-1 white--text findPwBtn">
                    비밀번호 찾기
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
                id: '',
                name: '',
                email: '',
                auth_key:'',
                input_auth_key:'',
                check_auth:false,
            }
        },
        methods: {
            ...mapActions({
                SendFindPwMail:"SendFindPwMail"
            }),
            async FindPwMail() {
                const reqInfo={
                    id:this.id,
                    name:this.name,
                    email:this.email,
                }
                this.auth_key=this.sendFindPwMail(reqInfo);
            }
        },
    }
</script>

<style lang="scss" scoped>
.findPwContainer{
    width: 60%;
}
.findPwTitle{
    margin-top: 25%;        
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
}

.findPwBtn{
    width:100%
}
</style>