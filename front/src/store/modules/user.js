import {getUserInfo} from '@/api/user'

export default {
    state: {
        value: 'my value'
    },
    getters: {
        value: state => {
            return state.value;
        }
    },
    mutations: {
        updateValue(state, payload) {
            state.value = payload;
        }
    },
    actions: {
        async getUserInfo({commit}, userIdx) {
            await getUserInfo(userIdx)
            commit('updateValue', userIdx);
        }
    }
};
