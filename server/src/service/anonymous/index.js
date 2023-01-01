

const signUp = async (id, pw)=> {
    try{
        isDuplicatedId = await anonymousReposiotory.getUserId(data.id) === true ? true: false;
      }catch(err){
        console.log(err.message)
        console.log('캐치문')
        if(err.message) {return next(err)}
        next({message:"CONTROLLER_SIGNUP_DUPLICATE_CHECK_ERROR"})
      }
  
      if (!duplicateTest){
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

module.exports = {
    signUp
}