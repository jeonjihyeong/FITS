// @ts-check

import { anonymousReposiotory } from '../../reposiotory';
import { salt, encryptionPassWord, decryptionPassWord } from '../../lib/common/hashing';
import redisClient from "../../lib/common/redis.util";
import mailSender from '../../lib/common/mailer';
import { signUpMail, findIdMail, findPwMail } from '../../lib/common/setMail';
import jwt from '../../lib/common/token';
import { server_warning, connection_error, logic_error } from '../../lib/common/error';
import { RedisCommandArgument } from '@redis/client/dist/lib/commands';

/**
 로그인 서비스
 * 
 * @param {*} id 
 * @param {*} pw 
 * @param {*} ip 
 * @returns 
 */
const login = async(id: any,pw: any,ip: any)=>{
  let userInfo: { dataValues: { userIdx: any; id: RedisCommandArgument; email: RedisCommandArgument; }; };
  try{
    userInfo = await anonymousReposiotory.getUserId(id);
  }catch(err){
    /*에러가 전해져 오는 에러면  if(err.messgae)면 그대로 throw / 아니면 logger하고 에러메시지를 던짐*/
    if(err.message) throw new Error(err.message)
    throw new Error(connection_error.SERVICE_GET_USER_DATA_ERROR)
  }

  const checkLoginResult = _checkLogin(pw,userInfo)

  if(await checkLoginResult===logic_error.LOGIN_ID_FAILED ||await checkLoginResult===logic_error.LOGIN_PW_FAILED){
    return checkLoginResult
  } 
  
  /*ip와 id만 넣으면 체크하는 메소드 작성*/
  /*원칙적으로 중복로그인 불가 But 강제로그아웃 + 강제로그인 메소드를 사용해서 기존 로그인을 invalid 처리 가능*/
  try{
    await _checkDuplicateLogin(id,userInfo)
  }catch(err){
    if(err.message)throw new Error(err.message)
    throw new Error(connection_error.SERVICE_DUPLICATE_CHECK_ERROR)
  }
  
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
    throw new Error(connection_error.SERVICE_SET_LOGIN_DATA_ERROR)
  }
  const tokenValue = {
    accessToken : accessToken,
    refreshToken : refreshToken
  }
  
  return {
    tokenValue
  }
}


/**
 * 
 * @param {*} pw 
 * @param {*} userInfo 
 * @returns 
 */
const _checkLogin = async(pw: any,userInfo: any) => {
  if (userInfo===null || !userInfo){
    return logic_error.LOGIN_ID_FAILED
  }

  const {salt} = userInfo.dataValues
  
  if(decryptionPassWord(pw,salt)!==userInfo.dataValues.pw){
    return logic_error.LOGIN_PW_FAILED
  }
  return true
}



/**
 * 
 * @param {*} ip 
 * @param {*} userInfo 
 * @returns 
 */
const _checkDuplicateLogin = async(ip: any,userInfo: any) => {
  let currentLoginIp: string | null
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


/**
 * 
 * @param {*} bodyData 
 * @returns 
 */
const signUp = async(bodyData: any)=> {
  let isDuplicatedId: boolean  
  try{
    const userDataById= await anonymousReposiotory.getUserId(bodyData.id)
    userDataById === null ? isDuplicatedId = false : isDuplicatedId = true;
  }catch(err){
    if(err.message) throw new Error(err.message)
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
    await redisClient.set(payload.id,'')
  }catch(err){
    if(err.message) throw new Error(err.message)
    throw new Error(connection_error.SERVICE_SET_SIGN_UP_ERROR)
  }

  return true
}

/**
 회원가입 메일 서비스
 * 
 * @param {string} email 
 * @returns
 */
const sendsignUPMail=async(email: string)=>{
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
const sendFindIdMail=async(name: any,email: any)=>{
  let getUserByEmail: { dataValues: { id: any; }; } | null;
  try{
    getUserByEmail=await anonymousReposiotory.getEmailData(name,email)
  }catch(err){
    if(err.message)throw new Error(err.message)
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
    throw new Error(connection_error.SERVICE_SEND_FIND_ID_MAIL_ERROR)
  }
  return true
}


/**
 * 
 * @param {*} id 
 * @param {*} email 
 * @param {*} name 
 * @returns 
 */
const sendFindPwMail=async(id: any,email: any,name: any)=>{
  let getUserDataByPwData: null;
    try{
      getUserDataByPwData =  await anonymousReposiotory.getPwData(id,email,name)
    }catch(err){
      if(err.message){throw new Error(err.message)}
      throw new Error(connection_error.SERVICE_SEND_FIND_PW_MAIL_CHECK_EXISTENCE_ERROR)
    }

    if(getUserDataByPwData===null||!getUserDataByPwData){
      return logic_error.NOT_EXIST_USER_BY_PW_DATA
    }

    const findPwMailText =findPwMail(name)

    try{
      await mailSender.sendGmail(findPwMailText.mailText,email)
    }catch(err){
      if(err.message){throw new Error(err.message)}
      throw new Error("CONTROLLER_SEND_FIND_PW_MAIL_ERROR")
    }
    
  return findPwMailText.auth_key
}


/**
 * 
 * @param {*} id 
 * @param {*} email 
 * @param {*} name 
 * @param {*} new_Pw 
 * @returns 
 */
const changePw = async(id: any,email: any,name: any,new_Pw: any)=>{
  let changePwUserData: { userIdx: any; } | null | undefined;

  try{
    changePwUserData = await anonymousReposiotory.getPwData(id,email,name)
  }catch(err){
    if(err.message){throw new Error(err.message)}
    throw new Error("SERVICE_CHANGE_PW_GET_USER_DATA_ERROR")
  }

  if(changePwUserData===null||changePwUserData===undefined){
    return logic_error.NOT_EXIST_USER_BY_PW_DATA
  }

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

export default{
  login,  
  signUp,
  sendsignUPMail,
  sendFindIdMail,
  sendFindPwMail,
  changePw
}