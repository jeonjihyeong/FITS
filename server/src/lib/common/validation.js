/* eslint-disable */
const emailForm = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ //이메일 형식
const passwordForm = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ //8자리이상 영문 대소문자 숫자 특수문자 한개씩 필요
const idForm = /^[a-zA-Z0-9]*$/ //공백제외 영어,숫자

export default {
    checkEmail:(email)=>{
        if (!email||!emailForm.test(email)){
            throw new Error('INVALID_REQUEST')
        }
        return;
    },
    checkId:(id)=>{
        if (!id||id.length <5||id.length > 15||!idForm.test(id)){
            throw new Error('INVALID_REQUEST')
        }
        return;
    },
    checkPw : (pw) => {
        if (!pw||!passwordForm.test(pw)){
            throw new Error('INVALID_REQUEST')
        }
        return
    },
    checkNickName : (nickName) => {
        if(!nickName || nickName.length <3 ||nickName.length > 12 ){
            throw new Error('INVALID_REQUEST')
        }
        return;
      }
}