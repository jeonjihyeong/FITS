const {anonymousReposiotory} =require('../../reposiotory')
const validateRequest = require('../../lib/common/validation');
const {anonymousService} = require('../../service');
const logger = require('../../lib/common/winston');
const { connection_error, server_warning } = require('../../lib/common/error');



/*로그인*/
/** 
 * @param {*} req 
 * @param {*} res 
 * @returns 
*/
const login = async(req, res) => {

  const ip = req.socket.remoteAddress
    let {id,pw} = req.body

    if(!id || !pw){
      logger.warn(server_warning.INVALID_REQUEST)
      return res.send()
    }
    
    let tokens;
    try{
      tokens = await anonymousService.login(id,pw,ip)
    }catch(err){
      if(!err.message) logger.error(connection_error.CONTROLLER_LOGIN_ERROR)
      return res.send();
    }

    if(!tokens.accessToken || !tokens.refreshToken)return res.send({message:tokens}) 
    
    res.send({
      token:{
        ...tokens
      }
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const signup = async(req,res) => {
    
    const {id,pw,email,age,name,nickname} = req.body;

    if(!id||!pw||!email||!age||!name||!nickname){
      logger.warn(server_warning.INVALID_REQUEST)
      return res.send()
    }
    
    const validateResult = validateRequest.signUpValdation(id,pw,email,nickname)
    if(!validateResult)return res.send()
    
    let issignUpSuccess;

    try{
      issignUpSuccess = await anonymousService.signUp({id,pw,email,age,name,nickname})
    }catch(err){
      if(!err.message) logger.error(connection_error.CONTROLLER_LOGIN_ERROR)
      return res.send();
    }
    
    if(issignUpSuccess="duplicateId"){
      return res.send({message:'duplicateID'})
    }
    res.send({message:'success'})
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
/* 회원가입 메일 */
const sendSignUpMail = async(req,res)=>{
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
    if(result===undefined){
      logger.error(connection_error.CONTROLLER_CHANGE_PW_ERROR)
    } 
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