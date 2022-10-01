<template>
    <v-container
        justify-center
        class="signUp">
        <v-row>
            <v-col>
            <v-text-field
                label="아이디 입력"
                v-model="id"
                hide-details="auto"
                color="pink lighten-1"
            >
            </v-text-field>
            <v-text-field
                label="비밀번호 입력"
                v-model="pw"
                hide-details="auto"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                @keyup.enter  ="login()"
                color="pink lighten-1"
            ></v-text-field>
            <v-text-field
                label="이름 입력"
                v-model="id"
                hide-details="auto"
                color="pink lighten-1"
            >
            </v-text-field>
            <v-text-field
                label="나이 입력"
                v-model="id"
                hide-details="auto"
                color="pink lighten-1"
            >
            </v-text-field>
            <v-text-field
                label="닉네임 입력"
                v-model="id"
                hide-details="auto"
                color="pink lighten-1"
            >
            </v-text-field>
        <v-text-field
                label="이메일"
                color="pink lighten-1"
                v-model="email"
                hide-details="auto"
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
                v-if="show1"
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
                <v-btn class="pink lighten-1 white--text signUpButton">
                    회원가입
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
                pw: '',
                name: '',
                nickname: '',
                age: '',
                email: '',
                show1: true,
            }
        },
        methods: {
            ...mapActions({
                signUpMail:'signUpMail'
            }),
            sendMail() {
                if (confirm("메일을 전송하시겠습니까?"))
                this.signUpMail(this.email)
            }
        },
        
    }
</script>

<style lang="scss" scoped>
    .signUp{
        width:50%;
    }
    .signUpButton{
        width: 100%;
    }
</style>