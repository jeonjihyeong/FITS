<template>
    <v-container
    justify-center
    class="signUp">
        <v-row
        class="signUpTitle" >
        회원가입
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    label="아이디 입력"
                    v-model="id"
                    hide-details="auto"
                    color="pink lighten-1"
                    :rules="rules.id"
                    :readonly="lockId"
                >
                </v-text-field>
                <v-text-field
                    label="비밀번호 입력"
                    v-model="pw"
                    hide-details="auto"
                    :type="pw_show ? 'text' : 'password'"
                    :append-icon="pw_show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="pw_show = !pw_show"
                    @keyup.enter  ="login()"
                    color="pink lighten-1"
                    :rules="rules.pw"
                    :readonly="lockPw"
                ></v-text-field>
                <v-text-field
                    label="이름 입력"
                    v-model="name"
                    hide-details="auto"
                    color="pink lighten-1"
                    :readonly="lockName"
                >
                </v-text-field>
                <v-text-field
                    label="닉네임 입력"
                    v-model="nickname"
                    hide-details="auto"
                    color="pink lighten-1"
                    :rules="rules.NickName"
                    :readonly="lockNickName"
                >
                </v-text-field>
                <v-text-field
                    label="나이 입력"
                    v-model="age"
                    hide-details="auto"
                    color="pink lighten-1"
                >
                </v-text-field>
                <v-text-field
                    label="이메일"
                    color="pink lighten-1"
                    v-model="email"
                    hide-details="auto"
                    :readonly="lockNickName"
                >
                <template v-slot:append>
                    <v-btn
                        class="pink lighten-1 white--text button"
                        v-on:click="sendMail()">
                            인증
                    </v-btn>
                </template>
                </v-text-field>
                <v-text-field
                    v-if="auth_show"
                    label="인증번호를 입력해주세요."
                    color="pink lighten-1"
                    v-model="auth_input"
                    hide-details="auto"
                >
                <template v-slot:append>
                    <v-btn
                        class="pink lighten-1 white--text button"
                        v-on:click="checkAuth()">
                            확인
                    </v-btn>
                </template>
                </v-text-field><br>
                <v-btn 
                    class="pink lighten-1 white--text signUpButton"
                    v-on:click="signUpUser()">
                        회원가입
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions} from 'vuex';
import authValidations from '../../utils/validation'

const checkEng = /[a-zA-Z]/;
const checkNum = /[0-9]/; 

    export default {
        data() {
            return {
                id: '',
                pw: '',
                name: '',
                nickname: '',
                age: '',
                email: '',
                pw_show: false,
                auth_show:false,
                auth_input:'',
                auth_key_ : '',
                check_auth: false,
                rules:{
                    id: [
                        value => !!value || '최소 5글자 이상의 영어 숫자만 사용해주세요.',
                        value => (checkEng.test(value) && checkNum.test(value) && value.length >= 5 &&value.length < 15) || '최소 5글자 이상의 영어 숫자만 사용해주세요.',
                    ],
                    pw: [
                        value => !!value || '8자리 이상의 영문, 숫자, 특수문자를 모두 사용하세요.',
                        value => (checkEng.test(value) && checkNum.test(value) && value.length >= 8) || '8자리 이상의 영문, 숫자, 특수문자를 모두 사용하세요.',
                    ],
                    NickName: [
                        value => !!value || '3글자 이상, 12글자 이하로 입력해주세요',
                        value => (checkEng.test(value) && checkNum.test(value) && value.length >= 3 &&value.length < 3) || '3글자 이상, 12글자 이하로 입력해주세요',
                    ]},
                lockId: false,
                lockPw: false,
                lockName: false,
                lockNickName: false,
                lockEmail: false,
                
            }
        },
        methods: {
            ...mapActions({
                signUpMail:'signUpMail',
                signUp: "signUp"
            }),
            // 회원가입
            async signUpUser(){
                if(!confirm("회원가입 하시겠습니까?")){
                    return;
                }
                const pre={
                    Id:authValidations.checkId(this.id),
                    Pw:authValidations.checkPw(this.pw),
                    NickName:authValidations.checkNickName(this.nickname)
                }
                if(pre.Id?.message||pre.Pw?.message||pre.NickName?.message){
                    if(pre.Id?.message){
                        alert("아이디: "+pre.Id?.message)
                        return;
                    }
                    if(pre.Pw?.message){
                        alert("비밀번호: "+pre.Pw?.message)
                        return;
                    }
                    if(pre.NickName?.message){
                        alert("닉네임: "+pre.NickName?.message)
                        return;
                    }
                }
                if(this.check_auth!==true){
                    alert("이메일 인증을 먼저해주세요.")
                    return
                }
                const signUpInfo ={
                    id:this.id,
                    pw:this.pw,
                    name:this.name,
                    nickname:this.nickname,
                    age:this.age,
                    email:this.email
                    }
                await this.signUp(signUpInfo);
            },
            // 회원가입 확인 메일
            async sendMail() {
                if (!confirm("메일을 전송하시겠습니까?")){
                    return;
                }
                const pre =authValidations.checkEmail(this.email)
                if(pre?.message){
                    alert(pre.message)
                    return;
                }
                this.auth_key_ = await this.signUpMail(this.email)
                this.auth_show =true
                console.log(this.auth_key_)
            },

            // 인증키 확인
            checkAuth(){
                if (this.auth_input===this.auth_key_){
                    alert("인증되었습니다.")
                    this.check_auth=true;
                    return;
                }
                alert("인증번호를 다시 확인해주세요.")
            },
        },
        
    }
</script>

<style lang="scss" scoped>
    .signUpTitle{
        margin-top: 25%;        
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        justify-content: center;
    }
    .signUp{
        width:50%;
    }
    .signUpButton{
        width: 100%;
    }
</style>