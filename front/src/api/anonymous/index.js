import http from '@/api/axios'

// 로그인 API
export const login=async(reqInfo)=>{
    let result;
    try{
        result = await http.post('/login',reqInfo)
    }
    catch(err){
        console.log(err);
    }

    if(!result.data.message){
        console.log(result.data)
        return result;
    }
    if(result.data.message==="idFailed"){
        alert('아이디가 틀렸습니다.')
        return 0
    }    
    if(result.data.message==="pwFailed"){
        alert('비밀번호가 틀렸습니다.')
        return 0
    }    
    alert("로그인 하였습니다.");
    return result
}

// 회원가입 API
    // 회원가입 인증 메일
export const sendSignUpMail=async(email)=>{
    let auth_key;
    let res;
    
    try{
        res = await http.post(`/signUpMail`,{email:email})
    }catch(err){
        console.log(err);
    }

    console.log("API레이어에서 호출:",res.data.data)
    auth_key =res.data.data
    return auth_key
}

    // 회원가입 하기
export const signUp = async(reqInfo)=>{
    let result;
    try{
        result = await http.post('/signUp',reqInfo)
    }catch(err){
        console.log(err)
    }
    console.log(result.data.data);
    if(result.data.data===0){
        alert("회원가입에 실패하였습니다.")
        return 0;
    }
    else if(result.data.data===1){
        alert("회원가입에 성공하였습니다.")
        location.href='/'
        return 1;
    }
    return
}

// 아이디 찾기
export const sendFindIdMail = async(reqInfo)=>{
    console.log(process.env.VUE_APP_SERVER_URL)
    let result;
    try{
        result=await http.post('/findId',reqInfo)
    }catch(err){
        console.log(err);
    }

    if(result.data.message){
        console.log(result.data.message)
        alert("메일을 전송하는데 실패하였습니다.")
        return;
    }

    alert("메일을 전송하였습니다.")
    return
}

// 비밀번호 인증 메일
export const sendFindPwMail=async(reqInfo)=>{
    let result;
    try{
        await http.post('/findPw',reqInfo)
    }catch(err){
        console.log(err);
    }

    if(result.data.message){
        alert("메일을 전송하는데 실패하였습니다.")
        console.log(result.data.message)
        return;
    }
    alert("메일을 전송하였습니다.")
    console.log(result.data.data)
    return result.data.data;
}

// 비밀번호 변경
export const changePw=async(reqInfo)=>{
    let result;
    try{
        result = await http.post('/changePw',reqInfo)
    }catch(err){
        console.log(err)
    }
    if(result.data.message){
        alert("비밀번호를 변경하지 못하였습니다.")
        console.log(result.data.message)
        return;
    }
    alert("비밀번호를 변경하였습니다.");
    return;
}

