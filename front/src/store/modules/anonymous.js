import {
    login,
    sendSignUpMail,
    signUp,
    sendFindIdMail,
    sendFindPwMail,
    changePw,
} from '@/api/anonymous'
import {changeUserData} from '@/api/user'
import jwt_decode from 'jwt-decode'


export default {
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
        },
        dropUserInfo(state){
            state.userInfo = {
                id:'',
                name:'',
                nickname:'',
                age:'',
                email:'',
            }
            state.accessToken=false
        }
    },

    actions:{
        // 로그인
        async login(context,reqInfo){
            try{
                console.log("store")
                const result = await login(reqInfo);
                console.log(result)
                if(result!==0){
                    localStorage.setItem('accessToken', result.data.token.accessToken)
                    localStorage.setItem('refreshToken', result.data.token.refreshToken)
                    const decodeToken = jwt_decode(result.data.token.accessToken)
                    context.commit('updateUserInfo',decodeToken)
                    return 'SUCCESS'
                }
            }catch(err){
                console.log(err)
            }
        },
        // 회원가입
        async signUp(context,reqInfo){
            return await signUp(reqInfo);
        },
        // 회원가입 메일
        async signUpMail(context,email){
            return await sendSignUpMail(email);
        },
        // 아이디 찾기 메일
        async findIdMail(context,reqInfo){
            return await sendFindIdMail(reqInfo)
        },
        // 비밀번호 찾기 메일
        async sendfindPwMail(context,reqInfo){
            return await sendFindPwMail(reqInfo)
        },
        // 비밀번호 변경
        async changePw(context,reqInfo){
            return await changePw(reqInfo)
        },
        // 로그아웃 토큰 삭제
        async dropToken(context){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return context.commit("dropUserInfo");
        },
        //회원정보 변경
        async changeUserData(context,reqData){
            return await changeUserData(reqData);
        }

    }
}

