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

module.exports = {
  login,  
  signUp
}