<template>
    <v-container>
        <v-row
            class="allNoteTitle">
            전체 스터디 노트
        </v-row>
        <v-row>
            <v-col cols="6" v-for="(item, index) in allNoteInfo" :key="index">
                <MyNoteCard :title='item.title'/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MyNoteCard from '@/components/board/myNoteCard.vue';
import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                allNoteInfo:{}
            }
        },
        created() {
            this.getNote();
        },
        methods: {
            ...mapActions({
                get: "getNote"
            }),
            async getNote() {
                try{
                    const result = await this.get();
                    if(result ==='expired token'){
                        this.$router.push('/')
                    }
                this.allNoteInfo ={...result}
                console.log(this.allNoteInfo)
                console.log(result);
                }catch(err){
                    console.log(err)
                }
            }
        },
        components: { MyNoteCard }
}
</script>

<style lang="scss" scoped>
.allNoteTitle{
    justify-content: left;
    margin-bottom:20px;
    font-size:28px;
    font-weight: bold;
    margin-left:3px
}
</style>