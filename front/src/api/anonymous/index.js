import http from '@/api/axios'

export default {
    
    // 로그인 API
    login: async(reqInfo)=>{
        let result;
        await http.post('/login',reqInfo
        ).then((res)=>{
            console.log(res.status)
            if(res.data.message){
                if(res.data.message==="idFailed"){
                    alert('아이디가 틀렸습니다.')
                    return 0;
                }    
                if(res.data.message==="pwFailed"){
                    alert('비밀번호가 틀렸습니다.')
                    return 0;
                }    
            }
            alert("로그인 하였습니다.");
            result = res
            return;
            
        }).catch((err)=>{
            console.log(err.response.data.message);
            console.log("에러")
            return 0;
        })
        return result
    },
    
    // 회원가입 API
        // 회원가입 인증 메일
    sendSignUpMail : async(email)=>{
        let auth_key;
        await http.post(`/signUpMail`,{
            email:email
        }).then((res)=>{
            console.log("API레이어에서 호출:",res.data.data)
            auth_key =res.data.data
        }).catch((err)=>{
            console.log(err);
        })
        return auth_key
    },
    
        // 회원가입 하기
    signUp : async(reqInfo)=>{
        await http.post('/signUp',{
            ...reqInfo
        }).then((res)=>{
            console.log(res.data.data);
            if(res.data.data===0){
                alert("회원가입에 실패하였습니다.")
                return;
            }
            else if(res.data.data===1){
                alert("회원가입에 성공하였습니다.")
                location.href='/'
                return;
            }
        }).catch((err)=>{
            console.log(err)
        })
        return
    },
    
    // 아이디 찾기
    sendFindIdMail : async(reqInfo)=>{
        console.log(process.env.VUE_APP_SERVER_URL)
        await http.post('/findId',{
            ...reqInfo
        }).then((res)=>{
            if(res.data.message){
                console.log(res.data.message)
                alert("메일을 전송하는데 실패하였습니다.")
                return;
            }
            alert("메일을 전송하였습니다.")
            console.log(res.data.data);
        }).catch((err)=>{
            console.log(err)
        })
        return
    },
    // 비밀번호 인증 메일
    sendFindPwMail:async(reqInfo)=>{
        let result;
        await http.post('/findPw',{
            ...reqInfo
        }).then((res)=>{
            if(res.data.message){
                alert("메일을 전송하는데 실패하였습니다.")
                console.log(res.data.message)
                return;
            }
            alert("메일을 전송하였습니다.")
            console.log(res.data.data)
            result = res.data.data
        }).catch((err)=>{
            console.log(err)
        })
        return result;
    },
    // 비밀번호 변경
    changePw:async(reqInfo)=>{
        await http.post('/changePw',reqInfo
        ).then((res)=>{
            if(res.data.message){
                alert("비밀번호를 변경하지 못하였습니다.")
                console.log(res.data.message)
                return;
            }
            alert("비밀번호를 변경하였습니다.");
        }).catch((err)=>{
            console.log(err);
        })
    }
}