const {anonymousReposiotory} = require('../../reposiotory')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const redisClient = require("../../lib/common/redis.util");
const {signUpMail,findIdMail,findPwMail} =require('../../lib/common/setMail')
const jwt=require('../../lib/common/token')

// 로그인 서비스
const login = async({id,pw})=>{
  let userInfo;
    
  try{
    userInfo=await anonymousReposiotory.getUserId(id);
  }catch(err){
    console.log(err);
    if(err.message){throw new Error(err.message)}
    throw new Error("SERVICE_GET_USER_ERROR")
  }

  if(userInfo===null||userInfo===undefined){
    return res.send ({message: 'idFailed'})
  }

  const {salt}=userInfo

  const decodePW = decryptionPassWord(pw,salt);

  const pwData=userInfo.dataValues.pw
  if(decodePW!==pwData){
      return res.send({message: 'pwFailed'})
  }

  // 보안이 필요한 정보는 삭제
  delete userInfo.dataValues.pw;
  delete userInfo.dataValues.salt;

  const accessToken = jwt.signToken({...userInfo.dataValues});
  const refreshToken = jwt.signRefreshToken();
    // redisClient.set(userInfo.dataValues.email, refreshToken);

    return {
        accessToken:accessToken,
        refreshToken:refreshToken,
    };

}


// 회원가입 서비스
const signUp = async(bodyData)=> {
  let isDuplicatedId  
  try{
    await anonymousReposiotory.getUserId(bodyData.id)===null?isDuplicatedId=false:isDuplicatedId=true
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
const sendsignUPMail=async(signUpText,email)=>{
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

module.exports = {
  login,  
  signUp,
  sendsignUPMail,
  sendFindIdMail,
  sendFindPwMail
}