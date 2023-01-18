const {anonymousReposiotory} = require('../../reposiotory')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const redisClient = require("../../lib/common/redis.util");
const mailSender = require('../../lib/common/mailer')
const {signUpMail,findIdMail,findPwMail} =require('../../lib/common/setMail')
const jwt=require('../../lib/common/token');
const { logger } = require('hello/lib/defaults/default');

// 로그인 서비스
const login = async({id,pw,ip})=>{
  let userInfo;
  try{
    userInfo=await anonymousReposiotory.getUserId(id);
  }catch(err){
    if(err.message)return undefined
    logger.Error('userInfo')
    return undefined
  }

  if(userInfo===null|| !userInfo || !userInfo.salt){
    throw new Error ('idFailed')
  }

  const {salt}=userInfo

  const decodePW = decryptionPassWord(pw,salt);

  const pwData=userInfo.dataValues.pw
  if(decodePW!==pwData){
      throw new Error('pwFailed')
  }

  const isLogin =await redisClient.get(userInfo.dataValues.id)
  console.log(isLogin)
  if(isLogin===ip) console.log('already login')
  if(isLogin===null) console.log('다음작업')
  if(isLogin!==ip) console.log("다른아이피에서 로그인 하였습니다. 강제로그인 필요")
  // 보안이 필요한 정보는 삭제
  delete userInfo.dataValues.pw;
  delete userInfo.dataValues.salt;

  const accessToken = jwt.signToken({...userInfo.dataValues});
  const refreshToken = jwt.signRefreshToken();
  console.log("redisSet")
  try{
    await redisClient
    .multi()
    .set(userInfo.dataValues.email, refreshToken)
    .set(userInfo.dataValues.id, ip)
    .exec()
  }catch(err){
    console.log(err)
  }
    return {
        accessToken:accessToken,
        refreshToken:refreshToken,
    };
}

// 회원가입 서비스
const signUp = async(bodyData)=> {
  let isDuplicatedId  
  try{
    const res= await anonymousReposiotory.getUserId(bodyData.id)
    res === null ? isDuplicatedId = false : isDuplicatedId = true;
  }catch(err){
    if(err.message) {throw new Error(err.message)}
    throw new Error("SERVICE_SIGNUP_DUPLICATE_CHECK_ERROR")
  }
  
  if (isDuplicatedId===true){
    throw new Error("SERVICE_SIGNUP_DUPLICATE_USER")
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
    if(err.message) {throw new Error(err.message)}
    throw new Error("SERVICE_SIGNUP_SAVE_ERROR")
  }
  return true
}

// 회원가입 메일 서비스
const sendsignUPMail=async(email)=>{
  const signUpText =signUpMail();
  try{
    await mailSender.sendGmail(signUpText.mailText, email)
  }catch(err){
      if(err.message){return next(err)}
      next({message:"CONTROLLER_SEND_SIGNUP_MAIL_ERROR"})
  }
  return signUpText.auth_key
}

// 아이디찾기 메일 서비스
const sendFindIdMail=async(name,email)=>{
  let getUserByEmail;
  try{
    getUserByEmail=await anonymousReposiotory.getEmailData(name,email)
  }catch(err){
    next({message:"CONTROLLER_SEND_FIND_ID_MAIL_CHECK_EXISTENCE_ERROR"})
  }

  if(getUserByEmail===null){
    return res.send({message:"No User Data"});
  }

  const findIdMailText = findIdMail(name,getUserByEmail.dataValues.id)
  
  try{
    await mailSender.sendsignUPMail(findIdMailText, email)
  }catch(err){
    console.log(err);
    next({message:"CONTROLLER_SEND_FIND_ID_MAIL_ERROR"})
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