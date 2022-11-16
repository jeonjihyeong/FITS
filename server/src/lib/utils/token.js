const jwt = require("jsonwebtoken")

// 토큰해석
const decodeToken =async(anyToken)=>{
    const decodedToken = jwt.decode(anyToken, 'aaa',{
        algorithm: 'HS256',
        expiresIn: '2h',
      })
    return decodedToken;
}

//  토큰생성
const signToken = async(payload) => {
    try{
        const result = jwt.sign(payload, 'aaa',{
        algorithm: 'HS256',
        expiresIn: '5h',
        })
        return result
    }catch(err){
        consonle.log(err)
    }
}

// 토큰 검증
const verifyToken = async(anyToken)=>{
    try {
        jwt.verify(anyToken, 'aaa',{
        })
        return true;
    }catch(err){
        if (err.name==='TokenExpiredError')throw new Error("EXPIRED_TOKEN");
        throw new Error("INVALID_TOKEN")
    }
}


module.exports={
    decodeToken, verifyToken, signToken
}