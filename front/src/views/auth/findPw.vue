<template>
    <v-container
        class="findPwContainer"
        justify-center>
        <v-row
            class="findPwTitle">
            비밀번호 찾기
        </v-row>
        <v-row v-if="!check_auth">
            <v-col>
                <v-text-field
                    label="아이디 입력"
                    v-model="id"
                    hide-details="auto"
                    color="pink lighten-1"
                />
                <v-text-field
                    label="이름 입력"
                    v-model="name"
                    hide-details="auto"
                    color="pink lighten-1"
                />
                <v-text-field
                label="이메일"
                v-model="email"
                hide-details="auto"
                color="pink lighten-1"
                >
                    <template v-slot:append>
                        <v-btn
                            class="pink lighten-1 white--text button"
                            v-on:click="FindPwMail()">
                                인증
                        </v-btn>
                    </template>
                </v-text-field>
                <v-text-field
                v-if="show"
                label="인증번호 입력"
                v-model="input_auth_key"
                hide-details="auto"
                color="pink lighten-1"
                >
                    <template v-slot:append>
                        <v-btn
                            class="pink lighten-1 white--text button"
                            v-on:click="authCheck()">
                                확인
                        </v-btn>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>
        <v-row v-if="check_auth">
            <v-col>
                <v-text-field
                    label="새로운 비밀번호 입력"
                    v-model="new_Pw"
                    hide-details="auto"
                    color="pink lighten-1"
                />
                <v-text-field
                    label="비밀번호 확인"
                    v-model="new_Pw_check"
                    hide-details="auto"
                    color="pink lighten-1"
                /><br>
                <v-btn
                    class="pink lighten-1 white--text findPwBtn"
                    v-on:click="changePassWord()">
                비밀번호 변경
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
                auth_key:null,
                input_auth_key:'',
                show:false,
                check_auth:false,
                new_Pw:'',
                new_Pw_check:'',
            }
        },
        methods: {
            ...mapActions({
                sendfindPwMail:"sendfindPwMail",
                changePw: "changePw"
            }),
            // 비밀번호 찾기 메일
            async FindPwMail() {
                const reqInfo={
                    id:this.id,
                    name:this.name,
                    email:this.email,
                }
                this.auth_key=await this.sendfindPwMail(reqInfo);
                this.show=true
            },
            // 인증번호 확인
            authCheck(){
                if(this.auth_key!=='' && this.auth_key===this.input_auth_key){
                    alert("성공적으로 인증되었습니다.")
                    this.check_auth=true
                    return;
                }
                alert("인증번호를 확인해주세요")
                return;
            },
            // 비밀번호 변경 API 호출
            async changePassWord(){
                if(this.new_Pw!==this.new_Pw_check){
                    alert("비밀번호를 변경하였습니다.")
                    return;
                }
                const reqInfo={
                    id: this.id,
                    name: this.name,
                    email: this.email,
                    new_Pw:this.new_Pw
                }
                await this.changePw(reqInfo)
            },
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