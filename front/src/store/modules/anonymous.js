import anonymousApi from '@/api/anonymous'

const anonymous = {
    state:{
        userInfo:{},
        auth_key:'',
        
    },
    getter:{
        auth_get_token(){
            return localStorage.getItem('accessToken')
        },
    },
    mutations:{
        change_auth_key: function (state, payload) {
            return state.auth__key=payload;
          }
    },
    actions:{
        login:(context,reqInfo)=>{
            console.log("store")
            anonymousApi.login(reqInfo);
        },
        signUp:(context)=>{
            console.log(context);
        },
        signUpMail:(context,email)=>{
            console.log(context);
            const auth_key = anonymousApi.sendSignUpMail(email);
            
        },

    }
}


export default anonymous