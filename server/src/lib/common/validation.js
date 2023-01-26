/* eslint-disable */
const emailForm = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ //이메일 형식
const passwordForm = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ //8자리이상 영문 대소문자 숫자 특수문자 한개씩 필요
const idForm = /^[a-zA-Z0-9]*$/ //공백제외 영어,숫자

const signUpValdation = (id,pw,email, nickName) => {
    if(!_checkId(id)||!_checkEmail(email)||!_checkPw(pw)||!_checkNickName(nickName)){
        return false
    }
    return true
}

const _checkId=(id)=>{
    console.log('Id: '+id)
    if (!id||id.length <5||id.length > 15||!idForm.test(id)){
        return false
    }
    return true;
}
const _checkEmail=(email)=>{
    console.log('Email: '+email)
    if (!email||!emailForm.test(email)){
        return false
    }
    return true;
}

const _checkPw = (pw) => {
    console.log('Pw: '+pw)
    if (!pw||!passwordForm.test(pw)){
        return false
    }
    return true
}

const _checkNickName = (nickName) => {
    console.log('NickName: '+ nickName)
    if(!nickName || nickName.length <3 ||nickName.length > 12 ){
        return false
    }
    return true;
}

module.exports = {
    signUpValdation
}