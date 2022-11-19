/* eslint-disable */
const emailForm = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ //이메일 형식
const passwordForm = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ //8자리이상 영문 대소문자 숫자 특수문자 한개씩 필요
const idForm = /^[a-zA-Z0-9]*$/ //공백제외 영어,숫자

export default {
    checkEmail:(email)=>{
        if (!email){
            return {message :'이메일이 입력되지 않았습니다.'};
        }
        if (!emailForm.test(email)){
            return {message :'이메일 형식이 아닙니다.'};
        }
        return;
    },
    checkId:(id)=>{
        if (!id){
            return {message :'아이디가 입력되지 않았습니다.'};
        }
        if(id.length <5){
            return {message : '최소 5글자 이상 입력해주세요.'};
          }
        if(id.length > 15){
            return {message : '최대 15글자까지 입력해주세요.'};
        }
        if(!idForm.test(id)){
            return {message:'영어와 숫자만 사용해주세요'}
        }
        return;
    },
    checkPw : (pw) => {
        if (!pw){
            return {message :'비밀번호가 입력되지 않았습니다.'};
        }
        if (!passwordForm.test(pw)){
            return {message :'8자리 이상의 영문, 숫자, 특수문자를 모두 사용하세요.'};
        }
        return
    },
    checkNickName : (nickName) => {
        if(!nickName){
          return {message : '닉네임을 입력해주세요.'};
        }
        if(nickName.length <3){
          return {message : '3글자 이상 입력해주세요.'};
        }
        if(nickName.length > 12){
          return {message : '최대 12글자까지 입력해주세요.'};
        }
        return;
      }
}