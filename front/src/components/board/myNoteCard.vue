<template>
    <v-card>
        <router-link :to="{name:'memo', params:{memoNumber:memoNumber}}">
            <v-img
            src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTExMTJfMTI1%2FMDAxNjM2NzI1NjE4NjQw.GEewoww7BRhJBXexutXVeX_GLWvW96Im9i6sHNaZObcg.QBOiFhHfK86jeQL1PTru8HRqdeooyyU-EzWDeiS_7fgg.JPEG.ho0605%2F20211112_111322.jpg&type=sc960_832'
            class="white--text align-end"
            height="200px"
            >
            <v-card-title v-text="hello"></v-card-title>
            </v-img>
        </router-link>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon
                color="pink lighten-1">
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon
                color="pink lighten-1"
                @click="marker=!marker">
                <v-icon v-if="marker">mdi-bookmark</v-icon>
                <v-icon disabled v-if="!marker">mdi-bookmark</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                hello:"ㅎㅇㅎㅇ",
                marker: Boolean,
                like: Boolean,
            }
        },
        props: ['memoNumber'],
    }
</script>

<style lang="scss" scoped>

</style>