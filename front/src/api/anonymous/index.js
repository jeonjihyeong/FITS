import axios from 'axios'

// 로그인 API
const login =async({id,pw})=>{
    console.log(process.env.VUE_APP_SERVER_URL)
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/signIn`,{
        id:id,
        pw:pw
    }).then((res)=>{
        if(res.status === 200){
            console.log("success");
            localStorage.setItem('accessToken',res.data.data)
            return;
        }
        console.log("failed");
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


export default {login,sendSignUpMail,signUp}