<template>
    <v-container>
        <v-row
            class="userProfileTitle">
            프로필
        </v-row>
        <v-row>
            <v-col cols="3" class="profileImage">
                <v-img
                src='../../assets/FITS_LOGO.png'
                class="white--text align-end"
                height="200px"
                ></v-img>
            </v-col>
            <v-col cols="3" class="follwNav">
                <router-link
                    to="/"
                    class="black--text">팔로우
                </router-link>
            </v-col>
            <v-col cols="3" class="follwNav">
                <router-link
                    to="/"
                    class="black--text">
                    팔로잉
                </router-link>
            </v-col>
            <v-col cols="3" class="follwNav">
                <v-btn class="white--text pink lighten-1">
                    팔로우하기
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="userProfileNote">
                스터디 노트
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-btn 
                color="pink lighten-1"
                text
                v-on:click="logOut()"
                >
                로그아웃
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                note: {}
            }
        },

        created () {
            this.getUserInfo;
        },

        methods: {
            ...mapActions({
                logout:"dropToken",
                getUserInfo:"getUserInfo"
            }),
            async logOut() {
                try{
                    this.logout();
                    this.$router.push('/')
                }catch(err){
                    console.log(err)
                }
            },

            async getUserInfo() {
                let userInfo
                try{
                    userInfo = this.getUserInfo();
                }catch(err){
                    console.log(err)
                }
                this.note = userInfo
            }
        },
    }
</script>

<style lang="scss" scoped>
.userProfileTitle{
    font-size: 35px;
    font-weight: bold;
    justify-content: center;
    margin-bottom: 30px;
}

.profileImage{
    width: 20%;
}

.follwNav{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
    color: black;
}

.userProfileNote{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}

</style>