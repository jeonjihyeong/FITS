import anonymousApi from '@/api/anonymous'

const anonymous = {
    state:{
        userInfo:{},
        accessToken:10000,
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
            return await anonymousApi.signUp(reqInfo);
        },
        // 회원가입 메일
        async signUpMail(context,email){
            return await anonymousApi.sendSignUpMail(email);
        },
        // 아이디 찾기 메일
        async findIdMail(context,reqInfo){
            return await anonymousApi.sendFindIdMail(reqInfo)
        },
        // 비밀번호 찾기 메일
        async sendfindPwMail(context,reqInfo){
            return await anonymousApi.sendFindPwMail(reqInfo)
        },
        async changePw(context,reqInfo){
            return await anonymousApi.changePw(reqInfo)
        },

    }
}


export default anonymous