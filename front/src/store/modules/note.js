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
        async getNote(context,userIdx){
            return await noteApi.getNote(userIdx)
        },
        async write(context,reqData){
            return await noteApi.writeNote(reqData)
        }
    }
};