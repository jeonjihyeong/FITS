<template>
    <v-container>
        <v-row class="commentRow">
            <v-col cols="1" class="writer">{{writer}}</v-col>
            <v-col cols="10" class="comment">{{comment}}</v-col>
            <v-col cols="1" class="deleteButton">
                <v-icon>
                    {{icons.mdiDelete}}
                </v-icon>
            
            </v-col>
            <v-col cols="11"><v-spacer></v-spacer></v-col>
            <v-col cols="1" class="commentDate">{{created}}</v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {
        mdiDelete,
    } from '@mdi/js'
    export default {
        data() {
            return {
                icons: {
                    mdiDelete
                },
            }
        },
        props: ['writer','comment','created'],
    }
</script>

<style lang="scss" scoped>
.writer{
    font-size: 20px;
    font-weight: bold;
}
.comment{
    font-size: 17px;
}
.deleteButton{
    text-align: center;
}
.commentDate{
    font-size: 15px;
    color: #aaa;
}
.commentRow{
    border-bottom: 1px solid #ccc;
}
</style>