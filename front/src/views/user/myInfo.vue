<template>
    <v-container
        justify-center
        class="myInfoContainer">
        <v-row
        class="myInfoTitle">
            내 정보
        </v-row>
        <v-card class="myInfoCard red lighten-5"
        >
            <br><br><br><br><br><br>
            <v-row class="myInfoText">
                아이디:{{userInfo.id}}
            </v-row>
            <v-row class="myInfoText">
                이메일: {{userInfo.email}}
            </v-row>
            <v-row class="myInfoText">
                이름:{{userInfo.name}}
            </v-row>
            <v-row class="myInfoText">
                닉네임:{{userInfo.nickname}}
            </v-row>
            <v-row class="myInfoText">
                나이:{{userInfo.age}}
            </v-row>
        </v-card>
        <br>
        <v-row class="myInfoNav">
            <v-spacer/>
            <router-link to="/user/update">
                <v-btn 
                color="pink lighten-1"
                text
                >회원정보 변경
                </v-btn>
            </router-link>
            
            <v-btn 
                color="pink lighten-1"
                text
                v-on:click="logOut()"
                >로그아웃</v-btn>
        </v-row>
    </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex';

    export default {
        computed: {
            ...mapState({
        userInfo:state=>state.anonymous.userInfo
      })
        },
        methods: {
            ...mapActions({logout:"dropToken"}),
            logOut() {
                try{
                    this.logout();
                    this.$router.push('/')
                }catch(err){
                    console.log(err)
                }
            }
        },
        
    }
</script>

<style lang="scss" scoped>
.myInfoTitle{
    font-size: 25px;
    font-weight: bold;
    justify-content: center;
    margin-bottom: 30px;
}
.myInfoText{
    justify-content: center;
    font-size: 20px;
}
.myInfoCard{
    width: 50%;
    height: 400px;
    vertical-align: center;
    margin: auto;
}
.myInfoNav{
    width: 50%;
    margin: auto;
}
</style>