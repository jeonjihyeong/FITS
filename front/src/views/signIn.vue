<template>
    <v-container
        justify-center
        >
        <v-container
        class="signInContainer" id="pc">
            <v-row class="loginText">
                로그인
            </v-row>
            <v-row>
                <v-text-field
                    label="아이디 입력"
                    v-model="id"
                    hide-details="auto"
                    color="pink lighten-2"
                >
                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field
                    label="비밀번호 입력"
                    v-model="pw"
                    hide-details="auto"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    @keyup.enter  ="login"
                    color="pink lighten-2"
                ></v-text-field>
            </v-row>
            <v-row>
                <v-col cols="3" class="signInNav"><router-link to="/findId"><v-btn text color="pink lighten-1">아이디 찾기</v-btn></router-link></v-col>
                <v-col cols="4" class="signInNav"><router-link to="/findPw"><v-btn text color="pink lighten-1">비밀번호 찾기</v-btn></router-link></v-col>
                <v-col cols="3" class="signInNav"><router-link to="/signUp"><v-btn text color="pink lighten-1">회원가입</v-btn></router-link></v-col>
                <v-col cols="2"><v-btn class="pink lighten-1 white--text" @click="login()">로그인</v-btn></v-col>
            </v-row>
        </v-container>

<!------------- mobile ------------->
        <v-container id = "mobile">
            <v-row class="loginText">
                로그인
            </v-row>
            <v-row>
                <v-text-field
                    label="아이디 입력"
                    v-model="id"
                    hide-details="auto"
                    color="pink lighten-2"
                >
                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field
                    label="비밀번호 입력"
                    v-model="pw"
                    hide-details="auto"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    @keyup.enter  ="login"
                    color="pink lighten-2"
                ></v-text-field>
            </v-row><br><br>
            <v-row>
                <v-btn class="pink lighten-1 white--text mobile_login" @click="login()">로그인</v-btn>
            </v-row>
            <v-row>
                <v-col class="signInNav"><router-link to="/findId"><v-btn text color="pink lighten-1">아이디 찾기</v-btn></router-link></v-col>
                <v-col class="signInNav"><router-link to="/findPw"><v-btn text color="pink lighten-1">비밀번호 찾기</v-btn></router-link></v-col>
                <v-col class="signInNav"><router-link to="/signUp"><v-btn text color="pink lighten-1">회원가입</v-btn></router-link></v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script>
    export default {
        name:"signIn",
        data() {
            return {
                id: null,
                pw: null,
                show1:false,
            }
        },
    }
</script>

<style lang="scss" scoped>
    @media all and (max-width:767px) {
        #pc, .pc_margin, .pc_item{
            display: none;
        }
    }
    @media all and (max-width:1023px) {
        #pc, .pc_margin, .pc_item{
            display: none;
        }
    }
    @media all and (min-width:1024px) {
        #mobile{
            display: none;
        }
    }

    #mobile{
        margin-top: 20%;
    }
    .signInContainer{
        margin-top: 20%;
        width: 50%;
    }
    .loginText{
        margin-bottom:15px ;
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        justify-content: center;
    }
    .signInNav{
        font-size: 13px;
        font-weight: bold;
        padding-top: 23px;
        text-align: center;
    }
    .mobile_login{
        width:100%;
    }
</style>