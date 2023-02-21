import {
    // changeNote,
    deleteNote,
    getNote,
    getOneNote,
    writeNote,
    noteLike
} from '@/api/note'

import {writeComment} from '@/api/comment'

export default {
    state: {
        value: 'my value',
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
        async getNote(context,page){
            return await getNote(page)
        },
        // 글 작성하기(완)
        async write(context,reqData){
            return await writeNote(reqData)
        },
        // 게시글 하나 가지고오기
        async getOneNote(context,noteIdx){
            return await getOneNote(noteIdx)
        },
        async writeComment(context,reqInfo){
            return await writeComment(reqInfo);
        },
        async deleteNote(context, noteIdx){
            return await deleteNote(noteIdx);
        },
        async noteLike(context, noteIdx){
            return await noteLike(noteIdx);
        },
    }
};