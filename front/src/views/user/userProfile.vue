<template>
    <v-container>
        <v-row
            class="userProfileTitle">
            프로필
        </v-row>
        <v-row
            class="userProfileNav">
            <v-col cols="3" class="profileImage" >
                <v-img
                src='../../assets/전지형.png'
                class="white--text align-end rounded-circle  bg-secondary d-inline-block"
                height="150px"
                width="150px"
                ></v-img>
                <v-row class="snsLink">
                    <v-col cols="3">
                        <v-img src='../../assets/github.png'
                        height="25px"
                        width="25px"
                        class="gitHubImage">
                        </v-img>
                    </v-col>
                    <v-col cols="9" class="gitHubLink">
                        https://github.com/jeonjihyeong
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="3" class="follwNav">
                <router-link
                    to= "/user/follower"
                    class="black--text">
                    팔로워 : {{follower}}
                </router-link>
            </v-col>
            <v-col cols="3" class="follwNav">
                <router-link
                    to="/"
                    class="black--text">
                    팔로잉 : {{following}}
                </router-link>
            </v-col>
            <v-col cols="3" class="follwNav">
                <v-btn
                    v-if="isfollowing"
                    class="white--text pink lighten-1">
                    팔로우하기
                </v-btn>
                <v-btn
                    v-if="!isfollowing"
                    class="white--text pink lighten-1">
                    팔로우취소
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="userProfileNote">
                스터디 노트
            </v-col>
        </v-row>
        <v-row>
            <v-col
            cols = 3>
                <MyNoteCard 
                    :title='item.title'
                    :noteIdx = 'item.noteIdx'
                    :like = 'item.likes'/>
            </v-col>
            <v-col
            cols = 3>
                <MyNoteCard 
                    :title='item.title'
                    :noteIdx = 'item.noteIdx'
                    :like = 'item.likes'/>
            </v-col>
            <v-col
            cols = 3>
                <MyNoteCard 
                    :title='item.title'
                    :noteIdx = 'item.noteIdx'
                    :like = 'item.likes'/>
            </v-col>
            <v-col
            cols = 3>
                <MyNoteCard 
                    :title='item.title'
                    :noteIdx = 'item.noteIdx'
                    :like = 'item.likes'/>
            </v-col>
            <v-col
            cols = 3>
                <MyNoteCard 
                    :title='item.title'
                    :noteIdx = 'item.noteIdx'
                    :like = 'item.likes'/>
            </v-col>
            <v-col
            cols = 3>
                <MyNoteCard 
                    :title='item.title'
                    :noteIdx = 'item.noteIdx'
                    :like = 'item.likes'/>
            </v-col>
            <v-col
            cols = 3>
                <MyNoteCard 
                    :title='item.title'
                    :noteIdx = 'item.noteIdx'
                    :like = 'item.likes'/>
            </v-col>
            <v-col
            cols = 3>
                <MyNoteCard 
                    :title='item.title'
                    :noteIdx = 'item.noteIdx'
                    :like = 'item.likes'/>
            </v-col>
        </v-row>
        <v-row class="paginate">
            <v-pagination
            v-model="page"
            :length="5"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            color="pink lighten-1"
        ></v-pagination>
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
import MyNoteCard from '@/components/board/myNoteCard.vue';
import { mapActions } from 'vuex';

    export default {
  components: { MyNoteCard },
        data() {
            return {
                note: {},
                item: {
                    title:"gdgd",
                    noteIdx: "1",
                    likes: 'sd'
                },
                follower: 204,
                following: 240,
                isfollowing:false,
                page:1
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
    text-align: center;
}

.follwNav{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 60px;
    justify-content: center;
    color: black;
}

.userProfileNote{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}

.userProfileNav{
    margin-bottom: 50px
}

.paginate{
    justify-content: center;
}

.gitHubImage{
    margin-left: auto;
}

.gitHubLink{
    text-align:left;
}

.snsLink{
    justify-content: center;
    text-align: center;
    margin:auto
}

</style>