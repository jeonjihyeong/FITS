
const validateRequest = require('../../lib/common/validation');
const  {anonymousService}=require('../../service');
const logger = require ('../../lib/common/winston');
const { connection_error, server_warning } = require ('../../lib/common/error');

const loggerInfo ={
  SIGN_UP_USER: "<SERVER INFO> New user SignUp."
}


/*로그인*/

const login = async(req,res,next) => {

  const ip = req.socket.remoteAddress
    let {id,pw} = req.body

    if(!id || !pw){
      logger.warn(server_warning.INVALID_REQUEST_WARN)
      return res.send(undefined)
    }
    
    let loginResult;
    try{
      loginResult = await anonymousService.login(id,pw,ip)
    }catch(err){
      if(err.message)return next(err)
      return next({message:connection_error.CONTROLLER_LOGIN_ERROR});
    }
    
    if(!loginResult.accessToken || !loginResult.refreshToken)return res.send({message:loginResult}) 
    
    res.send({
      token:{
        ...loginResult
      }
    })
}


const signup = async(req,res,next) => {
    
    const {id,pw,email,age,name,nickname} = req.body;

    if(!id||!pw||!email||!age||!name||!nickname)return next({message:server_warning.INVALID_REQUEST_WARN})
    
    if(!validateRequest.signUpValdation(id,pw,email,nickname)) return next({message:server_warning.INVALID_REQUEST_WARN})
    
    let isSignUpSuccess

    try{
      isSignUpSuccess = await anonymousService.signUp({id,pw,email,age,name,nickname})
    }catch(err){
      if(err.message) next(err)
      return next({message: connection_error.CONTROLLER_LOGIN_ERROR})
    }
    if(isSignUpSuccess==="duplicateId"){
      return res.send({message:'duplicateID'})
    }
    res.send({data:1})
}


/* 회원가입 메일 */
const sendSignUpMail = async(req,res,next)=>{
  const {email}=req.body;
  let result
  if(!email){
    return next({message:server_warning.INVALID_REQUEST_WARN})
  }

  try{
    result = await anonymousService.sendsignUPMail(email)
  }catch(err){
    if(err.message){return next(err)}
    next({message:connection_error.CONTROLLER_SEND_SIGN_UP_MAIL_ERROR})
  }

  res.send({data:result})
}

// 아이디 찾기 메일
const sendFindIdMail = async(req,res,next)=>{
  const {email,name}=req.body
  if(!email||!name){
    return next({message:"INVALID_REQUEST"})
  }

  let result;

  try{
    result = await anonymousService.sendFindIdMail(email,name)
  }catch(err){
    if(err.message)return next(err)
    next({message:connection_error.CONTROLLER_SEND_FIND_ID_MAIL_ERROR})
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
    next({message:connection_error.CONTROLLER_SEND_FIND_PW_MAIL_ERROR})
  }
  
  res.send({data:result})
}

// 비밀번호 변경하기
const changePw = async(req,res,next)=>{
  let result;
  const {id,email,name,new_Pw}=req.body;
  if(!id||!email||!name||!new_Pw){
    return next({message:server_warning.INVALID_REQUEST_WARN})
  }
  
  try{
    result = await anonymousService.changePw(id,email,name,new_Pw)
    if(result===undefined){
      logger.error(connection_error.CONTROLLER_CHANGE_PW_ERROR)
    } 
  }catch(err){
    if(err.message){return next(err)}
    next({message:connection_error.CONTROLLER_CHANGE_PW_ERROR})
  }
  res.send({data: result})
}

module.exports = {
    login,
    signup,
    sendSignUpMail,
    sendFindIdMail,
    sendFindPwMail,
    changePw
}