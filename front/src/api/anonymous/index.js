import axios from 'axios'

// 로그인 API
const login =async(reqInfo)=>{
    console.log(process.env.VUE_APP_SERVER_URL)
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/login`,{
        ...reqInfo
    }).then((res)=>{
        console.log(res.status)
        if("message" in res.data){
            if(res.data.message==="idFailed"){
                alert('아이디가 틀렸습니다.')
                return;
            }    
            if(res.data.message==="pwFailed"){
                alert('비밀번호가 틀렸습니다.')
                return;
            }    
        }
        alert("로그인 하였습니다.");
        localStorage.setItem('accessToken',res.data.data)
        return;

    }).catch((err)=>{
        console.log(err);
        return;
    })
}

// 회원가입 API
    // 회원가입 인증 메일
const sendSignUpMail = async(email)=>{
    console.log(process.env.VUE_APP_SERVER_URL)
    let auth_key=''
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/signUpMail`,{
        email:email
    }).then((res)=>{
        console.log("API레이어에서 호출:",res.data.data)
        auth_key =res.data.data
    }).catch((err)=>{
        console.log(err);
    })
    return auth_key
}

    // 회원가입 하기
const signUp = async(reqInfo)=>{
    console.log(process.env.VUE_APP_SERVER_URL)
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/signUp`,{
        ...reqInfo
    }).then((res)=>{
        console.log(res.data.data);

    }).catch((err)=>{
        console.log(err)
    })
    return
}

// 아이디 찾기
const sendFindIdMail = async(reqInfo)=>{
    console.log(process.env.VUE_APP_SERVER_URL)
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/findId`,{
        ...reqInfo
    }).then((res)=>{
        console.log(res.data.data);
    }).catch((err)=>{
        console.log(err)
    })
    return
}


export default {login,sendSignUpMail,signUp,sendFindIdMail}