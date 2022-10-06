const jwt = require('jsonwebtoken')
const {anonymousService} =require('../../service')
const {signToken}=require('../../lib/common/token')
const mailSender = require('../../lib/common/mailer')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const {signUpMail,findIdMail,findPwMail} =require('../../lib/common/setMail')
require('dotenv').config();

// 로그인
const login = async(req, res) => {
    try{
        const data=req.body;
        const idData=await anonymousService.getUserId(data.id);
        if(idData===null){
          res.send ({message: 'idFailed'})
        }else {
            const decodePW = decryptionPassWord(data.pw,idData.salt);
            const pwData=idData.dataValues.pw
            if(decodePW!==pwData){
                res.send({message: 'pwFailed'})
            }else {
              delete idData.dataValues.pw;
              const payload = {
                ...idData.dataValues
              }
              const token = await signToken(payload);
                res.send({data: token});
            }
        }
      }catch(err){
        console.log(err);
        res.status(400)
      }
    }
  // 회원가입
const signup = async(req,res)=>{
    const data= req.body;
    const hashPw = encryptionPassWord(data.pw);
    console.log(data.id)
    const duplicateCheck= await anonymousService.getUserId(data.id);
    console.log(duplicateCheck)
    if (duplicateCheck!==null){
      console.log('id가 이미 존재합니다.');
      res.send({data: 0})
    }else{
      try{
          const payload={
            ...data,
            pw:hashPw,
            salt:salt,
          }
          await anonymousService.saveUser(payload);
          res.send({data: 1})
      }catch(err){
          console.log(err);
          res.send({message:`ERROR: ${err}`});
          
      }
    }
}

const signUp_mail = async(req,res)=>{
    const mail_data = req.body.email;
    const signUpText = signUpMail()
    try{
        mailSender.sendGmail(signUpText.mailText, mail_data)
        res.send({data:signUpText.auth_key})
    }catch(err){
        console.log(err);
        throw new Error("SEND_MAIL_ERROR")
    }
    }


module.exports={
    login, signup,signUp_mail
}