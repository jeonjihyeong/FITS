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
        const decodePassword = crypto.createHash("sha512").update(InputPw + DB_salt).digest("hex");
        return decodePassword;
    }catch(err){
        // TODO: Logger
        // throw new Error("DECODING_ERROR")
        return undefined;
    }
}

module.exports ={
    salt,
    encryptionPassWord,
    decryptionPassWord,
}