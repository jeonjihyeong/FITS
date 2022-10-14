<template>
    <v-container>
        <v-container
            id="pc"
            class="myNOteContainer"
            justify-center>
            <v-row class="MyNoteTitle">
                내 노트
            </v-row>
            <v-row>
            <v-spacer></v-spacer>
            <v-btn
                color="pink lighten-1"
                text
                class="writeMemoBtn"
                >
                글쓰기
            </v-btn>
            </v-row>
            <v-row class="MyNoteContent">
            <v-col cols="6" v-for="(item,index) in list" :key="index">
                <MyNoteCard :memoNumber='item'/>
            </v-col>
            </v-row>
        </v-container>
        <!-- mobile version -->
        <v-container
            id ="mobile"
            class="myNOteContainer"
            justify-center>
            <v-row class="MyNoteTitle">
                내 노트
            </v-row>
            <v-row>
            <v-spacer></v-spacer>
            <v-btn
                color="pink lighten-1"
                text
                class="writeMemoBtn"
                >
                글쓰기
            </v-btn>
            </v-row>
            <v-row class="MyNoteContent">
            <v-col cols="12" v-for="(item,index) in list" :key="index">
                <MyNoteCard :memoNumber='item'/>
            </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import MyNoteCard from "../../components/board/myNoteCard.vue";
    export default {
    data() {
        return {
            list: [1, 2, 3, 4,5],
        };
    },
    components: { MyNoteCard }
}
</script>

<style lang="scss" scoped>
@media all and (max-width:767px) {
    #pc{
        display: none;
    }
    }
@media all and (max-width:1023px) {
    #pc {
        display: none;
    }
}
@media all and (min-width:1024px) {
    #mobile{
        display: none;
    }
}
.myNOteContainer{
    width: 80%;
}
.MyNoteContent{
    justify-content: center;
    margin-bottom: 30px;
}
.MyNoteTitle{
    justify-content: left;
    margin-bottom:20px;
    font-size:28px;
    font-weight: bold;
    margin-left:3px
}
.writeMemoBtn{
    font-size: 17px;
    font-weight: bolder;
}
</style>