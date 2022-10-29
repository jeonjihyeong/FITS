<template>
    <v-container>
        <v-row
            class="allNoteTitle">
            전체 스터디 노트
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        created () {
            this.getNote();
        },
        methods: {
            ...mapActions({
                get:"getNote"
            }),
            async getNote() {
                const result = await this.get();
                console.log(result)
            }
        },
    }
</script>

<style lang="scss" scoped>
.allNoteTitle{
    font-size: 25px;
    font-weight: bold;
}
</style>