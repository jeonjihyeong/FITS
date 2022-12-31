const {anonymousReposiotory} =require('../../reposiotory')
const jwt=require('../../lib/common/token')
const mailSender = require('../../lib/common/mailer')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const {signUpMail,findIdMail,findPwMail} =require('../../lib/common/setMail')
const redisClient = require("../../lib/common/redis.util");

// 로그인
const login = async(req, res,next) => {
    let {id,pw} = req.body
    let userInfo;
    
    try{
      userInfo=await anonymousReposiotory.getUserId(id);
    }catch(err){
      console.log(err);
      if(err.message){return next(err)}
      return next({message:"CONTROLLER_LOGIN_GET_USER_ERROR"})
    }
      
    
    if(userInfo===null||userInfo===undefined){
      return res.send ({message: 'idFailed'})
    }

    const {salt}=userInfo

    let decodePW
    try{
      decodePW =await decryptionPassWord(pw,salt);
    }catch(err){
      return next({message:"CONTROLLER_LOGIN_DECODING_ERROR"})
    }

    const pwData=userInfo.dataValues.pw
    if(decodePW!==pwData){
        return res.send({message: 'pwFailed'})
    }

    delete userInfo.dataValues.pw;
    delete userInfo.dataValues.salt;

    let accessToken,refreshToken
    try{
      accessToken = await jwt.signToken({...userInfo.dataValues});
      refreshToken = await jwt.signRefreshToken();
      redisClient.set(userInfo.dataValues.email, refreshToken);
    }catch(err){
      console.log(err)
      return next({message:"CONTROLLER_SIGN_TOKEN_ERROR"});
    }

    res.send({
      token:{
        accessToken:accessToken,
        refreshToken:refreshToken,
    }});
}

const login2 = async(req,res)=>{
  if(req.body===null||req.body===undefined){
    return res.status(200).json({
      status: 400,
      message: "Error: Body(JSON)값이 비어있습니다."
    });
  } 
  if(req.body.hasOwnProperty('id')===false||req.body.hasOwnProperty('pw')===false){
    return res.status(200).json({
      message:"Error: 이메일 또는 비밀번호가 없습니다."
    });
  }
  try{
    await anonymousReposiotory.login()
  }catch(err){
    console.log(err);
  }
}

// 회원가입
const signup = async(req,res,next)=>{
    const data= req.body;
    let duplicateTest;

    try{
      duplicateTest = await anonymousReposiotory.getUserId(data.id)
    }catch(err){
      console.log(err.message)
      console.log('캐치문')
      if(err.message) {return next(err)}
      next({message:"CONTROLLER_SIGNUP_DUPLICATE_CHECK_ERROR"})
    }

    if (duplicateTest!==null){
      console.log('id가 이미 존재합니다.');
      return res.send({data: 0})
    }

    let hashPw;
    try{
      hashPw =await encryptionPassWord(data.pw);
    }catch(err){
      console.log(err.message)
      if(err.message) {return next(err);}
      next({message:"CONTROLLER_SIGNUP_HASHING_ERROR"})
    }

    const payload={
      ...data,
      pw:hashPw,
      salt:salt,
    }

    try{
      await anonymousReposiotory.saveUser(payload);
    }catch(err){
      console.log(err.message)
      if(err.message) {return next(err);}
      next({message:"CONTROLLER_SIGNUP_SAVE_ERROR"})
    }

    res.send({data: 1})
}

// 회원가입 메일
const sendSignUpMail = async(req,res,next)=>{
  let signUpText;
  try{
    const mail_data = req.body.email;
    signUpText = signUpMail()
      await mailSender.sendGmail(signUpText.mailText, mail_data)
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