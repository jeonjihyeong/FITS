import noteApi from '@/api/note'

export default {
    state: {
        value: 'my value'
    },
    getters: {
        // value: state => {
        //     return state.value;
        // }
    },
    mutations: {
        // updateValue(state, payload) {
        //     state.value = payload;
        // }
    },
    actions: {
        // 전체 노트 가지고오기
        async getNote(context,userIdx){
            return await noteApi.getNote(userIdx)
        },
        // 글 작성하기(완)
        async write(context,reqData){
            return await noteApi.writeNote(reqData)
        }
    }
};