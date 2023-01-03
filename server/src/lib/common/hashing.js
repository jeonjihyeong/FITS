const crypto = require('crypto')

// 암호화 키값 생성자
const salt = Math.round((new Date().valueOf() * Math.random())) + "";

// 인코딩
const encryptionPassWord= (InputPw)=>{
    let hashPassword = crypto.createHash("sha512").update(InputPw + salt).digest("hex");
    return hashPassword;
}
// 디코딩
const decryptionPassWord=  (InputPw,DB_salt)=>{
    try{
        let decodePassword = crypto.createHash("sha512").update(InputPw + DB_salt).digest("hex");
        return decodePassword;
    }catch(err){
        throw new Error("DECODING_ERROR")
    }
}
module.exports ={
    salt,
    encryptionPassWord,
    decryptionPassWord,
}