const {anonymousReposiotory} =require('../../reposiotory')
const validateRequest = require('../../lib/common/validation');
const {anonymousService} = require('../../service')
const jwt=require('../../lib/common/token')
const mailSender = require('../../lib/common/mailer')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const {signUpMail,findIdMail,findPwMail} =require('../../lib/common/setMail')
const redisClient = require("../../lib/common/redis.util");

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
  let signUpText;
  const {email} = req.body;
  if (!email){
    return next({message:"INVALID_REQUEST"})
  }
  signUpText = signUpMail()
  try{
    await mailSender.sendGmail(signUpText.mailText, email)
  }catch(err){
      if(err.message){return next(err)}
      next({message:"CONTROLLER_SEND_SIGNUP_MAIL_ERROR"})
  }
    res.send({data:signUpText.auth_key})
}

// 아이디 찾기 메일
const sendFindIdMail = async(req,res,next)=>{
  let checkUserExistenceByEmail;
  try{
    checkUserExistenceByEmail=await anonymousReposiotory.getEmailData(req.body)
  }catch(err){
    next({message:"CONTROLLER_SEND_FIND_ID_MAIL_CHECK_EXISTENCE_ERROR"})
  }

  if(checkUserExistenceByEmail===null){
    return res.send({message:"No User Data"});
  }
  const mail_data = req.body.email;
  const findIdMailText = findIdMail(req.body)

  try{
    await mailSender.sendGmail(findIdMailText, mail_data)
  }catch(err){
    console.log(err);
    next({message:"CONTROLLER_SEND_FIND_ID_MAIL_ERROR"})
  }

  res.send({data:1})
}

// 비밀번호 찾기 메일
const sendFindPwMail = async(req,res)=>{
  let checkUserExistenceByPwData;
  try{
    checkUserExistenceByPwData =  await anonymousReposiotory.getPwData(req.body)
  }catch(err){
    if(err.message){return next(err)}
    next({message:"CONTROLLER_SEND_FIND_PW_MAIL_CHECK_EXISTENCE_ERROR"})
  }
  if(checkUserExistenceByPwData===null||checkUserExistenceByPwData===undefined){
    return res.send({message:"No User Data"})
  }
  const findPwMailText = findPwMail(req.body.name)
  try{
    await mailSender.sendGmail(findPwMailText.mailText,req.body.email)
  }catch(err){
    if(err.message){return next(err)}
    next({message:"CONTROLLER_SEND_FIND_PW_MAIL_ERROR"})
  }
  res.send({data:findPwMailText.auth_key})
}

// 비밀번호 변경하기
const changePw = async(req,res)=>{
  let changePwUserData;
  try{
    changePwUserData = await anonymousReposiotory.getPwData(req.body)
  }catch(err){
    if(err.message){return next(err)}
    next({message:"CONTROLLER_CHANGE_PW_GET_USER_DATA_ERROR"})
  }
  if(changePwUserData===null||changePwUserData===undefined){
    console.log("No user Data")
    return res.send({message:"No User Data"})
  }
  try{
    let inCodeNewPw ={
      hashPw:await encryptionPassWord(req.body.new_Pw),
      salt: salt
    }
    await anonymousReposiotory.changePassword(changePwUserData.userIdx,inCodeNewPw);
  }catch(err){
    if(err.message){return next(err)}
    next({message:"CONTROLLER_CHANGE_PW_ERROR"})
  }
  res.send({data: 1})
}

module.exports={
    login,
    signup,
    sendSignUpMail,
    sendFindIdMail,
    sendFindPwMail,
    changePw
}