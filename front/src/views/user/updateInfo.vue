<template>
    <v-container justify-center>
        <v-row class="updateUserInfoTitle">
            회원정보 변경
        </v-row>
        <v-row class="changeUserInfo">
            <v-col cols="12">
                <v-text-field
                label="이름"
                v-model="name"
                hide-details="auto"
                color="pink lighten-2"/>
            </v-col>
            <v-col cols="12">
                <v-text-field
                label="이메일"
                v-model="email"
                hide-details="auto"
                color="pink lighten-2"/>
            </v-col>
            <v-col cols="12">
                <v-text-field
                label="비밀번호"
                type="password"
                v-model="password"
                hide-details="auto"
                color="pink lighten-2"/>
            </v-col>
            <v-col>
                <v-spacer/>
                <v-btn></v-btn>
            </v-col>
            
        </v-row>

    </v-container>
</template>

<script>
import { mapState } from 'vuex';
    export default {
        data() {
            return {
                name: "",
                email:'',
                pw: ''
            }
        },
        computed: {
            ...mapState({
            userInfo:state=>state.anonymous.userInfo
            })
        },
        created () {
            this.name=this.userInfo.name;
            this.email=this.userInfo.email;
        },
        
    }
</script>

<style lang="scss" scoped>
.updateUserInfoTitle{
    justify-content: center;
    margin-bottom:20px;
    font-size:28px;
    font-weight: bold;
    margin-left:3px
}
.changeUserInfo{
    width:80%;
    margin: auto;
}
</style>