<template>
    <v-container>
        <v-container id="pc">
            <v-row class="homeTitle">
                인기 스터디룸
            </v-row>
            <v-row>
                <v-col cols="4"><RoomCard/></v-col>
                <v-col cols="4"><RoomCard/></v-col>
                <v-col cols="4"><RoomCard/></v-col>
            </v-row>
            <br><br>
            <v-row class="homeTitle">
                내 글
            </v-row>
            <v-row>
                <v-col cols=3><TextCard/></v-col>
                <v-col cols=3><TextCard/></v-col>
                <v-col cols=3><TextCard/></v-col>
                <v-col cols=3><TextCard/></v-col>
            </v-row>
            <br><br>
            <v-row class="homeTitle">
                추천 게시글
            </v-row>
            <v-row>
                <v-col cols="3"><TextCard 
                    :category='"react"'
                    :title='"React Study"'
                    :writer='"전지형"'
                    :content='"react is good library"'/></v-col>
                <v-col cols="3"><TextCard 
                    :category='"vue"'
                    :title='"vue Study"'
                    :writer='"전지형"'
                    :content='"vue is good frame work"'/></v-col>
                <v-col cols="3"><TextCard 
                    :category='"express"'
                    :title='"express Study"'
                    :writer='"전지형"'
                    :content='"express is good library"'/></v-col>
                <v-col cols="3"><TextCard 
                    :category='"node"'
                    :title='"node.js Study"'
                    :writer='"문준영"'
                    :content='"노드는 강력합니다."'/></v-col>
                <v-col cols="3"><TextCard 
                    :category='"java"'
                    :title='"java study"'
                    :writer='"전지형"'
                    :content='"JAVA is good"'/></v-col>
                <v-col cols="3"><TextCard 
                    :category='"react"'
                    :title='"React Study"'
                    :writer='"전지형"'
                    :content='"react is good library"'/></v-col>
                <v-col cols="3"><TextCard 
                    :category='"react"'
                    :title='"React Study"'
                    :writer='"전지형"'
                    :content='"react is good library"'/></v-col>
                <v-col cols="3"><TextCard 
                    :category='"react"'
                    :title='"React Study"'
                    :writer='"전지형"'
                    :content='"react is good library"'/></v-col>
            </v-row>
        </v-container>

        <v-container id="mobile">
        <v-row class="homeTitle">
            인기 스터디룸
        </v-row>
        <v-row>
            <v-col cols="6"><RoomCard/></v-col>
            <v-col cols="6"><RoomCard/></v-col>
        </v-row>
        <br><br>
        <v-row class="homeTitle">
            내 글
        </v-row>
        <v-row>
            <v-col cols=4><TextCard/></v-col>
            <v-col cols=4><TextCard/></v-col>
            <v-col cols=4><TextCard/></v-col>
        </v-row>
        <br><br>
        <v-row class="homeTitle">
            추천 게시글
        </v-row>
        <v-row>
            <v-col cols="4"><TextCard 
                :category='"react"'
                :title='"React Study"'
                :writer='"전지형"'
                :content='"react is good library"'/></v-col>
            <v-col cols="4"><TextCard 
                :category='"vue"'
                :title='"vue Study"'
                :writer='"전지형"'
                :content='"vue is good frame work"'/></v-col>
            <v-col cols="4"><TextCard 
                :category='"express"'
                :title='"express Study"'
                :writer='"전지형"'
                :content='"express is good library"'/></v-col>
            <v-col cols="4"><TextCard 
                :category='"node"'
                :title='"node.js Study"'
                :writer='"문준영"'
                :content='"노드는 강력합니다."'/></v-col>
            <v-col cols="4"><TextCard 
                :category='"java"'
                :title='"java study"'
                :writer='"전지형"'
                :content='"JAVA is good"'/></v-col>
            <v-col cols="4"><TextCard 
                :category='"react"'
                :title='"React Study"'
                :writer='"전지형"'
                :content='"react is good library"'/></v-col>
        </v-row>
        
        </v-container>
    </v-container>
</template>

<script>
import TextCard from '@/components/board/textCard.vue';
import RoomCard from '@/components/board/roomCard.vue';
    export default {
    components: { TextCard, RoomCard},
    data() {
        return {
        }
    },
}
</script>

<style lang="scss" scoped>
    @media all and (max-width:767px) {
    #pc{
        display: none;
    }
}
@media all and (max-width:1023px) {
    #pc{
        display: none;
    }
}
@media all and (min-width:1024px) {
    #mobile{
        display: none;
    }
}
.homeTitle{
    font-size:25px;
    font-weight:bold;
    margin-left: 5px;
}
</style>