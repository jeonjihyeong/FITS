import api from '@/api'

const auth = {
    state:{
        userInfo:{},
        
    },
    getter:{
        auth_get_token(){
            return localStorage.getItem('accessToken')
        },
    },
    mutations:{

    },
    actions:{

    }
}


export default auth