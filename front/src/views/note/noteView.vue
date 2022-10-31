<template>
    <v-container>
        <v-row>
            게시글
        </v-row>
        <v-row>
            {{noteInfo.title}}
        </v-row>
        <v-row>
            {{noteInfo.content}}
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                noteInfo:{}
            }
        },
        methods: {
            ...mapActions({
                getNote:"getOneNote"
            }),
            async getOneNote() {
                const noteIdx = this.$route.params.noteIdx;
                const result = await this.getNote(noteIdx);
                console.log(result)
            }
        },
        created () {
            this.getOneNote();
        },
    }
</script>

<style lang="scss" scoped>

</style>