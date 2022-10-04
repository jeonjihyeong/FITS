import anonymousApi from '@/api/anonymous'

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
        
    },
    actions:{
        // 로그인
        async login(context,reqInfo){
            console.log("store")
            await anonymousApi.login(reqInfo);
        },
        // 회원가입
        async signUp(context,reqInfo){
            alert("회원가입에 성공하였습니다.")
            return await anonymousApi.signUp(reqInfo);
        },
        // 회원가입 메일
        async signUpMail(context,email){
            alert("메일을 전송하였습니다.");
            return await anonymousApi.sendSignUpMail(email);
        },

    }
}


export default anonymous