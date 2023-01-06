const {anonymousReposiotory} = require('../../reposiotory')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const redisClient = require("../../lib/common/redis.util");
const jwt=require('../../lib/common/token')
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

const sendsignUPMail=async(signUpText,email)=>{
  
  try{
    await mailSender.sendGmail(signUpText.mailText, email)
  }catch(err){
      if(err.message){return next(err)}
      next({message:"CONTROLLER_SEND_SIGNUP_MAIL_ERROR"})
  }
  return {data:signUpText.auth_key}
}

const sendFindIdMail=async(findIdMailText,{name,email})=>{
  let checkUserExistenceByEmail;
  
  try{
    checkUserExistenceByEmail=await anonymousReposiotory.getEmailData(name,email)
  }catch(err){
    next({message:"CONTROLLER_SEND_FIND_ID_MAIL_CHECK_EXISTENCE_ERROR"})
  }

  if(checkUserExistenceByEmail===null){
    return res.send({message:"No User Data"});
  }

  try{
    await mailSender.sendsignUPMail(findIdMailText, email)
  }catch(err){
    console.log(err);
    next({message:"CONTROLLER_SEND_FIND_ID_MAIL_ERROR"})
  }

  res.send({data:1})
}

module.exports = {
  login,  
  signUp,
  sendsignUPMail,
  sendFindIdMail
}