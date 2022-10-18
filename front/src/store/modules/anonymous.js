import anonymousApi from '@/api/anonymous'
import jwt_decode from 'jwt-decode'
const anonymous = {
    state:{
        userInfo:{
            id:'',
            name:'',
            nickname:'',
            age:'',
            email:'',
        },
        accessToken:false,
    },
    getter:{
        auth_get_token(){
            return localStorage.getItem('accessToken')
        },
    },
    mutations: {
        updateUserInfo(state, payload) {
            state.userInfo = {...payload};
            state.accessToken = true;
        }
    },
    actions:{
        // 로그인
        async login(context,reqInfo){
            try{
                console.log("store")
                const result = await anonymousApi.login(reqInfo);
                console.log(result)
                if(result!==0){
                    localStorage.setItem('accessToken',result.data.data)
                    const decodeToken = jwt_decode(result.data.data)
                    context.commit('updateUserInfo',decodeToken)
                    return 'SUCCESS'
                }
            }catch(err){
                console.log(err)
            }
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