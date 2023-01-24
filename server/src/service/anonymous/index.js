const {anonymousReposiotory} = require('../../reposiotory')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const redisClient = require("../../lib/common/redis.util");
const mailSender = require('../../lib/common/mailer')
const {signUpMail,findIdMail,findPwMail} =require('../../lib/common/setMail')
const jwt=require('../../lib/common/token');
const logger =require('../../lib/common/winston')
const {server_warning,connection_error, logic_error} = require('../../lib/common/error')

// 로그인 서비스
const login = async(id,pw,ip)=>{
  let userInfo;
  throw new Error()
  try{
    userInfo = await anonymousReposiotory.getUserId(id);
  }catch(err){
    /*에러가 전해져 오는 에러면  if(err.messgae)면 그대로 throw / 아니면 logger하고 에러메시지를 던짐*/
    if(err.message) throw new Error(err.message)
    logger.error(connection_error.SERVICE_GET_USER_DATA)
    throw new Error(connection_error.SERVICE_GET_USER_DATA)
  }

  const checkLoginResult = _checkLogin(id,pw)

  if(checkLoginResult===logic_error.LOGIN_ID_FAILED || checkLoginResult===logic_error.LOGIN_PW_FAILED){
    return checkLoginResult
  } 
  
  /*ip만 넣으면 체크하는 메소드 작성*/
  /*원칙적으로 중복로그인 불가 But 강제로그아웃 + 강제로그인 메소드를 사용해서 기존 로그인을 invalid 처리 가능*/
  const isDuplicatedLogin = await _checkDuplicateLogin(id,userInfo)
  
  if(isDuplicatedLogin === server_warning.DUPLICATE_LOGIN_WARN){
    logger.warn(server_warning.DUPLICATE_LOGIN_WARN)
    return server_warning.DUPLICATE_LOGIN_WARN
  }
  
  if(!isDuplicatedLogin) return

  // 보안이 필요한 정보는 삭제
  const payload = {
    userIdx: userInfo.dataValues.userIdx,
    id: userInfo.dataValues.id,
    email: userInfo.dataValues.id,
    name: userInfo.dataValues.id,
    nickName: userInfo.dataValues.id,
  }

  const accessToken = jwt.signToken(payload);
  const refreshToken = jwt.signRefreshToken();

  try{
    await redisClient
    .multi()
    .set(userInfo.dataValues.email, refreshToken)
    .set(userInfo.dataValues.id, ip)
    .exec()
  }catch(err){
    if(err.message)throw new Error(err.message)
    logger.error(connection_error.SERVICE_SET_LOGIN_DATA_ERROR)
    throw new Error(connection_error.SERVICE_SET_LOGIN_DATA_ERROR)
  }
  
    return {
        accessToken : accessToken,
        refreshToken : refreshToken,
    };
}

const _checkLogin = async(id,pw,userInfo) => {
  if (userInfo===null || !userInfo){
    return logic_error.LOGIN_ID_FAILED
  }

  const {salt}=userInfo.dataValues
  
  if(decryptionPassWord(pw,salt)!==userInfo.dataValues.pw){
    return logic_error.LOGIN_PW_FAILED
  }
  return true
}

const _checkDuplicateLogin = async(ip,userInfo) => {
  let currentLoginIp
  try{
    currentLoginIp = await redisClient.get(userInfo.dataValues.id)
  }catch(err){
    logger.error(connection_error.SERVICE_GET_IP_ERROR)
    return undefined
  }
  if(currentLoginIp === null || !currentLoginIp) return true

  if(currentLoginIp !== ip){
    logger.warn(server_warning.DUPLICATE_LOGIN_WARN)
    return server_warning.DUPLICATE_LOGIN_WARN
  }
  return true
}



// 회원가입 서비스
const signUp = async(bodyData)=> {
  let isDuplicatedId  
  try{
    const res= await anonymousReposiotory.getUserId(bodyData.id)
    res === null ? isDuplicatedId = false : isDuplicatedId = true;
  }catch(err){
    if(err.message) throw new Error(err.message)
    logger.error(connection_error.SERVICE_DUPLICATE_CHECK_ERROR)
    throw new Error(connection_error.SERVICE_DUPLICATE_CHECK_ERROR)
  }
  
  if (isDuplicatedId===true){
    return logic_error.SIGN_UP_DUPLICATE_ID
  }
  
  const hashPw =encryptionPassWord(bodyData.pw);
  
  const payload={
    ...bodyData,
    pw:hashPw,
    salt:salt,
  }
  
  try{
    await anonymousReposiotory.saveUser(payload);
  }catch(err){
    if(err.message) throw new Error(err.message)
    throw new Error(connection_error.SERVICE_SET_SIGN_UP_ERROR)
  }

  return true
}

// 회원가입 메일 서비스
const sendsignUPMail=async(email)=>{
  const signUpText =signUpMail();
  try{
    await mailSender.sendGmail(signUpText.mailText, email)
  }catch(err){
      if(err.message)throw new Error(err.message)
      logger.error(connection_error.SERVICE_SEND_SIGN_UP_MAIL_ERROR)
      throw new Error(connection_error.SERVICE_SEND_SIGN_UP_MAIL_ERROR)
  }
  return signUpText.auth_key
}

// 아이디찾기 메일 서비스
const sendFindIdMail=async(name,email)=>{
  let getUserByEmail;
  try{
    getUserByEmail=await anonymousReposiotory.getEmailData(name,email)
  }catch(err){
    if(err.message)throw new Error(err.message)
    logger.error(connection_error.SERVICE_GET_USER_DATA_BY_EMAIL_ERROR)
    throw new Error(connection_error.SERVICE_GET_USER_DATA_BY_EMAIL_ERROR)
  }

  if(getUserByEmail===null){
    return logic_error.NOT_EXIST_USER_BY_EMAIL
  }

  const findIdMailText = findIdMail(name,getUserByEmail.dataValues.id)
  
  try{
    await mailSender.sendsignUPMail(findIdMailText, email)
  }catch(err){
    if(err.message)throw new Error(err.message)
    logger.error(connection_error.SERVICE_SEND_FIND_ID_MAIL_ERROR)
    throw new Error(connection_error.SERVICE_SEND_FIND_ID_MAIL_ERROR)
  }
  return 1
}


const sendFindPwMail=async(id,email,name)=>{
  let getUserDataByPwData;
    try{
      getUserDataByPwData =  await anonymousReposiotory.getPwData(id,email,name)
    }catch(err){
      if(err.message){throw new Error(err.message)}
      throw new Error("CONTROLLER_SEND_FIND_PW_MAIL_CHECK_EXISTENCE_ERROR")
    }

    if(getUserDataByPwData===null||getUserDataByPwData===undefined){
      return res.send({message:"No User Data"})
    }

    const findPwMailText = findPwMail(name)

    try{
      await mailSender.sendGmail(findPwMailText.mailText,email)
    }catch(err){
      if(err.message){throw new Error(err.message)}
      throw new Error("CONTROLLER_SEND_FIND_PW_MAIL_ERROR")
    }
    
  return findPwMailText.auth_key
}

const changePw = async(id,email,name,new_Pw)=>{
  let changePwUserData;

  try{
    changePwUserData = await anonymousReposiotory.getPwData(id,email,name)
  }catch(err){
    if(err.message){throw new Error(err.message)}
    throw new Error("SERVICE_CHANGE_PW_GET_USER_DATA_ERROR")
  }

  if(changePwUserData===null||changePwUserData===undefined){
    console.log("No user Data")
    return res.send({message:"No User Data"})
  }

  let inCodeNewPw ={
    hashPw:encryptionPassWord(newPw),
    salt: salt
  }
  
  try{
    await anonymousReposiotory.changePassword(changePwUserData.userIdx,inCodeNewPw);
  }catch(err){
    if(err.message){throw new Error(err.message)}
    throw new Error("SERVICE_CHANGE_PW_ERROR")
  }
  return 1
}

module.exports = {
  login,  
  signUp,
  sendsignUPMail,
  sendFindIdMail,
  sendFindPwMail,
  changePw
}