const {anonymousReposiotory} = require('../../reposiotory')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const redisClient = require("../../lib/common/redis.util");

const login = async(id){
  let {}
}

const signUp = async(bodyData)=> {
    try{
        isDuplicatedId = await anonymousReposiotory.getUserId(bodyData.id) === true ? true: false;
      }catch(err){
        if(err.message) {throw new Error(err.message)}
        throw new Error("SERVICE_SIGNUP_DUPLICATE_CHECK_ERROR")
      }
  
      if (!duplicateTest){
        return res.send({data: 0})
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
      res.send({data: 1})
}

module.exports = {
    signUp
}