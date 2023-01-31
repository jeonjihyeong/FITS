//@ts-check

import validateRequest from '../../lib/common/validation';
import {anonymousService} from '../../service';
import logger from '../../lib/common/winston';
import { connection_error, server_warning } from '../../lib/common/error';

const loggerInfo ={
  SIGN_UP_USER: "<SERVER INFO> New user SignUp."
}


/*로그인*/

const login = async(req: { socket: { remoteAddress: any; }; body: { id: any; pw: any; }; }, res: { send: (arg0: { message?: any; token?: any; } | undefined) => void; },next: (arg0: { message: any; }) => any) => {

  const ip = req.socket.remoteAddress
    let {id,pw} = req.body

    if(!id || !pw){
      logger.warn(server_warning.INVALID_REQUEST_WARN)
      return res.send(undefined)
    }
    
    let loginResult: { accessToken?: any; refreshToken?: any; } ;
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


const signup = async(req: { body: { id: any; pw: any; email: any; age: any; name: any; nickname: any; }; },res: { send: (arg0: { message?: string; data?: number; }) => void; },/** @type {(arg0: { message: string; }) => void} */ next: (arg0: { message: string; }) => void) => {
    
    const {id,pw,email,age,name,nickname} = req.body;

    if(!id||!pw||!email||!age||!name||!nickname)return next({message:server_warning.INVALID_REQUEST_WARN})
    
    if(!validateRequest.signUpValdation(id,pw,email,nickname)) return next({message:server_warning.INVALID_REQUEST_WARN})
    
    let isSignUpSuccess: string | boolean;

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
const sendSignUpMail = async(req: { body: { email: any; }; },res: { send: (arg0: { data: any; }) => void; },next: (arg0: { message: string; }) => void)=>{
  const {email}=req.body;
  let result: string | undefined;
  if(!email){
    return next({message:"INVALID_REQUEST"})
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
const sendFindIdMail = async(req: { body: { email: any; name: any; }; },res: { send: (arg0: { data: any; }) => void; },next: (arg0: { message: string; }) => void)=>{
  const {email,name}=req.body
  if(!email||!name){
    return next({message:"INVALID_TOKEN"})
  }

  let result: string | boolean | undefined;

  try{
    result = await anonymousService.sendFindIdMail(email,name)
  }catch(err){
    if(err.message)return next(err)
    next({message:connection_error.CONTROLLER_SEND_FIND_ID_MAIL_ERROR})
  }

  res.send({data:result})
}

// 비밀번호 찾기 메일
const sendFindPwMail = async(req: { body: { id: any; name: any; email: any; }; },res: { send: (arg0: { data: any; }) => void; },next: (arg0: { message: string; }) => void)=>{
  const {id,name,email}=req.body;
  if(!id||!name||!email){
    return next({message:"INVALID_REQUEST"})
  }

  let result: string | undefined;

  try{
    result = await anonymousService.sendFindPwMail(id,email,name)
  }catch(err){
    if(err.message){return next(err)}
    next({message:connection_error.CONTROLLER_SEND_FIND_PW_MAIL_ERROR})
  }
  
  res.send({data:result})
}

// 비밀번호 변경하기
const changePw = async(req: { body: { id: any; email: any; name: any; new_Pw: any; }; },res: { send: (arg0: { data: any; }) => void; },next: (arg0: { message: string; }) => void)=>{
  let result: string | number | undefined;
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

module.exports={
    login,
    signup,
    sendSignUpMail,
    sendFindIdMail,
    sendFindPwMail,
    changePw
}