const { anonymousReposiotory } = require( '../../reposiotory');
const { salt, encryptionPassWord, decryptionPassWord } = require( '../../lib/common/hashing');
const redisClient = require( "../../lib/common/redis.util");
const mailSender = require( '../../lib/common/mailer');
const { signUpMail, findIdMail, findPwMail } = require( '../../lib/common/setMail');
const jwt = require( '../../lib/common/token');
const { server_warning, connection_error, logic_error } = require( '../../lib/common/error');


const login = async(id,pw,ip)=>{
  let userInfo;
  try{
    userInfo = await anonymousReposiotory.getUserId(id);
  }catch(err){
    /*에러가 전해져 오는 에러면  if(err.messgae)면 그대로 throw / 아니면 logger하고 에러메시지를 던짐*/
    if(err.message) throw new Error(err.message)
    throw new Error(connection_error.SERVICE_GET_USER_DATA_ERROR)
  }

  await _checkLogin(pw,userInfo)
  // await _checkDuplicateLogin(id,userInfo)
  
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

  // await _setRedisIpAndRefreshToken(userInfo, refreshToken, ip);

  const tokenValue = {
    accessToken : accessToken,
    refreshToken : refreshToken
  }
  
  return {
    tokenValue
  }
}


const _checkLogin = async(pw,userInfo) => {
  if (userInfo===null || !userInfo){
    throw new Error(logic_error.LOGIN_ID_FAILED)
  }

  const {salt} = userInfo.dataValues
  
  if(decryptionPassWord(pw,salt)!==userInfo.dataValues.pw){
    throw new Error(logic_error.LOGIN_PW_FAILED) 
  }
  return true
}




const _checkDuplicateLogin = async(ip,userInfo) => {
  let currentLoginIp
  try{
    currentLoginIp = await redisClient.get(userInfo.dataValues.id)
  }catch(err){
    throw new Error(connection_error.SERVICE_GET_IP_ERROR)
  }

  if(currentLoginIp === null || !currentLoginIp) return true

  if(currentLoginIp !== ip){
    throw new Error(server_warning.DUPLICATE_LOGIN_WARN)
  }
  return true
}

const _setRedisIpAndRefreshToken = async(userInfo,refreshToken,ip)=>{
  try{
    await redisClient
    .multi()
    .set(userInfo.dataValues.email,refreshToken)
    .set(userInfo.dataValues.id, ip)
    .exec()
  }catch(err){
    if(err.message)throw new Error(err.message)
    throw new Error(connection_error.SERVICE_SET_LOGIN_DATA_ERROR)
  }
  return;
}


const signUp = async(bodyData)=> {

  await _checkDuplicateId(bodyData)
  
  const hashPw =encryptionPassWord(bodyData.pw);
  
  const payload={
    ...bodyData,
    pw:hashPw,
    salt:salt,
  }
  
  try{
    await anonymousReposiotory.saveUser(payload);
    // await redisClient.set(payload.id,'')
  }catch(err){
    if(err.message) throw new Error(err.message)
    throw new Error(connection_error.SERVICE_SET_SIGN_UP_ERROR)
  }

  return true
}

const _checkDuplicateId = async(bodyData)=>{
  try{
    const userDataById= await anonymousReposiotory.getUserId(bodyData.id)
    userDataById === null ? isDuplicatedId = false : isDuplicatedId = true;
  }catch(err){
    if(err.message) throw new Error(err.message)
    throw new Error(connection_error.SERVICE_DUPLICATE_CHECK_ERROR)
  }
  
  if (isDuplicatedId===true)throw new Error(logic_error.SIGN_UP_DUPLICATE_ID)
}

/**
 회원가입 메일 서비스
 * 
 * @param {string} email 
 * @returns
 */
const sendsignUPMail=async(email)=>{
  const signUpText =signUpMail();
  try{
    await mailSender.sendGmail(signUpText.mailText, email)
  }catch(err){
      if(err.message)throw new Error(err.message)
      throw new Error(connection_error.SERVICE_SEND_SIGN_UP_MAIL_ERROR)
  }
  return signUpText.auth_key
}


// 아이디찾기 메일 서비스
/**
 * 
 * @param {*} name 
 * @param {*} email 
 * @returns 
 */
const sendFindIdMail=async(name, email)=>{
  const getUserByEmail = await _checkUserExistenceAndGetUser(name,email)

  const findIdMailText = findIdMail(name,getUserByEmail.dataValues.id)
  
  try{
    await mailSender.sendGmail(findIdMailText, email)
  }catch(err){
    if(err.message)throw new Error(err.message)
    throw new Error(connection_error.SERVICE_SEND_FIND_ID_MAIL_ERROR)
  }
  return true
}

const _checkUserExistenceAndGetUser = async(name,email)=>{
  let getUserByEmail
  try{
    getUserByEmail=await anonymousReposiotory.getEmailData(name,email)
  }catch(err){
    if(err.message)throw new Error(err.message)
    throw new Error(connection_error.SERVICE_GET_USER_DATA_BY_EMAIL_ERROR)
  }

  if(getUserByEmail===null){
    throw new Error(logic_error.NOT_EXIST_USER_BY_EMAIL)
  }

  return getUserByEmail
}


/**
 * 
 * @param {*} id 
 * @param {*} email 
 * @param {*} name 
 * @returns 
 */
const sendFindPwMail=async(id, email, name)=>{
  await _checkExistenceByPwData(id,email,name)

  const findPwMailText =findPwMail(name)

  try{
    await mailSender.sendGmail(findPwMailText.mailText,email)
  }catch(err){
    if(err.message){throw new Error(err.message)}
    throw new Error(connection_error.SERVICE_SEND_FIND_PW_MAIL_ERROR)
  }
    
  return findPwMailText.auth_key
}

const _checkExistenceByPwData = async(id,email,name)=>{
  let getUserDataByPwData
  try{
    getUserDataByPwData =  await anonymousReposiotory.getPwData(id,email,name)
  }catch(err){
    if(err.message)throw new Error(err.message)
    throw new Error(connection_error.SERVICE_SEND_FIND_PW_MAIL_CHECK_EXISTENCE_ERROR)
  }

  if(getUserDataByPwData===null||!getUserDataByPwData){
    throw new Error(logic_error.NOT_EXIST_USER_BY_PW_DATA)
  }
}


/**
 * 
 * @param {*} id 
 * @param {*} email 
 * @param {*} name 
 * @param {*} new_Pw 
 * @returns 
 */
const changePw = async(id, email, name, new_Pw)=>{
  const changePwUserData = await _getUserToChangePw(id,email,name)

  let inCodeNewPw ={
    hashPw:encryptionPassWord(new_Pw),
    salt: salt
  }
  
  try{
    await anonymousReposiotory.changePassword(changePwUserData.userIdx,inCodeNewPw);
  }catch(err){
    if(err.message){throw new Error(err.message)}
    throw new Error(connection_error.SERVICE_CHANGE_PW_ERROR)
  }
  return 1
}

const _getUserToChangePw=async(id,email,name)=>{
  let changePwUserData

  try{
    changePwUserData = await anonymousReposiotory.getPwData(id,email,name)
  }catch(err){
    if(err.message){throw new Error(err.message)}
    throw new Error("SERVICE_CHANGE_PW_GET_USER_DATA_ERROR")
  }

  if(changePwUserData===null||changePwUserData===undefined){
    throw new Error(logic_error.NOT_EXIST_USER_BY_PW_DATA)
  }

  return changePwUserData
}

module.exports = {
  login,  
  signUp,
  sendsignUPMail,
  sendFindIdMail,
  sendFindPwMail,
  changePw
}