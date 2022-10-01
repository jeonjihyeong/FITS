import axios from 'axios'

// 로그인 API
const login =async(id,pw)=>{
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
const sendSignUpMail = async()=>{
    
}


export default {login,sendSignUpMail}