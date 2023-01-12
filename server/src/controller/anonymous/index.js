const {anonymousReposiotory} =require('../../reposiotory')
const validateRequest = require('../../lib/common/validation');
const {anonymousService} = require('../../service')

// 로그인
const login = async(req, res,next) => {
  if(req.body===null||req.body===undefined){
    next({message:"INVALID_REQUEST"})
  };

    let {id,pw} = req.body
    if(!id||!pw){next({message:"INVALID_REQUEST"})}
    let result;
    try{
      result = await anonymousService.login({id,pw})
    }catch(err){
      if(err.message){return next(err)}
      return next(err);
    }
    res.send({
      token:{
        ...result
      }
    })
      
    
}

const signup = async(req,res,next)=>{
    
    const {id,pw,email,age,name,nickname}= req.body;
    if(!id||!pw||!email||!age||!name||!nickname){
      next({message:"INVALID_REQUEST"})
    }
    try{
      validateRequest.checkId(id);
      validateRequest.checkPw(pw);
      validateRequest.checkEmail(email);
      validateRequest.checkNickName(nickname);
    }catch(err){
      return next(err)
    }
    // id : 숫자 영어 포함 최소 6글자
    let result;

    try{
      result = await anonymousService.signUp({id,pw,email,age,name,nickname})
    }catch(err){
      if(err.message){return next(err)}
      return next({message:"CONTROLLER_SIGNUP_ERROR"})
    }
    
    if(!result){
      return res.send({message:'failed'})
    }
    res.send({message:'success'})
}

// 회원가입 메일
const sendSignUpMail = async(req,res,next)=>{
  const {email}=req.body;
  let result;
  if(!email){
    return next({message:"INVALID_REQUEST"})
  }

  try{
    result = await anonymousReposiotory.sendMail(email)
  }catch(err){
    if(err.message){return next(err)}
    next({message:"CONTROLLER_SEND_SIGNUP_MAIL_ERROR"})
  }

  res.send({data:result})
}

// 아이디 찾기 메일
const sendFindIdMail = async(req,res,next)=>{
  const {email,name}=req.body
  if(!email||!name){
    return next({message:"INVALID_TOKEN"})
  }

  let result;

  try{
    result = anonymousReposiotory.sendFindIdMail(email,name)
  }catch(err){
    if(err.message){return next(err)}
    next({message:"CONTROLLER_SEND_FIND_ID_MAIL"})
  }

  res.send({data:result})
}

// 비밀번호 찾기 메일
const sendFindPwMail = async(req,res,next)=>{
  const {id,name,email}=req.body;
  if(!id||!name||!email){
    return next({message:"INVALID_REQUEST"})
  }

  let result;

  try{
    result = await anonymousService.sendFindPwMail(id,email,name)
  }catch(err){
    if(err.message){return next(err)}
    next({message:"CONTROLLER_FIND_PW_MAIL_ERROR"})
  }
  
  res.send({data:result})
}

// 비밀번호 변경하기
const changePw = async(req,res,next)=>{
  let result;
  const {id,email,name,new_Pw}=req.body;
  if(!id||!email||!name||!new_Pw){
    return next({message:"INVALID_REQUEST"})
  }
  
  try{
    result = await anonymousService.changePw(id,email,name,new_Pw) 
  }catch(err){
    if(err.message){return next(err)}
    next({message:"CONTROLLER_CHANGE_PW_ERROR"})
  }
  res.send({data: result})
}

module.exports={
    login,
    signup,
    sendSignUpMail,
    sendFindIdMail,
    sendFindPwMail,
    changePw
}