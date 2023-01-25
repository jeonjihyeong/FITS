const { promisify } = require('util');
const redisClient = require('./redis.util');
const jwt = require("jsonwebtoken");
const { authentication_error } = require('./error');

module.exports={
    //  토큰생성
    signToken : (payload) => {
        try{
            return jwt.sign(payload, process.env.JWT_KEY,{
            algorithm: 'HS256',
            expiresIn: '5h',
            })
        }catch(err){
            console.log(err)
            throw new Error("SIGN_TOKEN_ERROR")
        }
    },

    // 토큰해석
    decodeToken : (anyToken)=>{
        try{
            return jwt.decode(anyToken, process.env.JWT_KEY)
        } catch(err){
            if (err.name==='TokenExpiredError')throw new Error(authentication_error.EXPIRED_TOKEN);
            throw new Error(authentication_error.INVALID_TOKEN)
        }
    },
    
    // 토큰 검증
    verifyToken : (anyToken)=>{
        try {
            jwt.verify(anyToken, process.env.JWT_KEY);
            return true;
        }catch(err){
            if (err.name==='TokenExpiredError')throw new Error(authentication_error.EXPIRED_TOKEN);
            throw new Error(authentication_error.INVALID_TOKEN)
        }
    },

    // 리프레쉬 토큰
    signRefreshToken : ()=>{
        return jwt.sign({},process.env.JWT_KEY,{
            algorithm:'HS256',
            expiresIn: '14d',
        });
    },

    // 리프레쉬 토큰 검증
    refreshVerify: async(token, email) => {
        const getAsync = promisify(redisClient.get).bind(redisClient);

        try {
            const data = await getAsync(email); // refresh token 가져오기
            if (token === data) {
                try {
                    jwt.verify(token, secret);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
}

