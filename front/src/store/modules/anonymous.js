import loginApi from '@/api/anonymous'

const anonymous = {
    state:{
        userInfo:{},
        
    },
    getter:{
        auth_get_token(){
            return localStorage.getItem('accessToken')
        },
    },
    mutations:{
        get_user_Info(){

        }
    },
    actions:{
        login:(context,reqInfo)=>{
            console.log("store")
            loginApi(reqInfo);
        }
    }
}


export default anonymous