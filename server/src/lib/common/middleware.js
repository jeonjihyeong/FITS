const { authentication_error } = require("./error");
const token = require("./token");

// 토큰확인
const validateToken = async(req,res,next)=>{
    let accessToken = req.headers.authorization;
    try{
        token.verifyToken(accessToken)
        const writeUserInfo =token.decodeToken(accessToken);
        req.decode = writeUserInfo;
        next();
    }catch(err){
        next(err)
    }
}

const refreshToken = async(req,res,next)=>{
    let accessToken = req.headers.authorization;
    let refreshToken = req.headers.refreshToken;
    try{
        console.log("MIDDLE_WARE: WORKING");
        const decodeToken = token.decodeToken(accessToken);
        const varify_refresh=token.refreshVerify(refreshToken,decodeToken.email)
        console.log(varify_refresh)
        if (varify_refresh){
            console.log("리프레쉬 토큰 유효 - accessToken 재발급")
            const new_accessToken = token.signToken(decodeToken)
            const new_refreshToken = token.signRefreshToken()
            res.send({
                token:{
                    accessToken:new_accessToken,
                    refreshToken:new_refreshToken
            }})
        }
        else{
            console.log("리프레쉬 토큰 유효하지 않음 - 재로그인 필요")
            res.send({message:authentication_error.INVALID_REFRESH_TOKEN});
        }
    }catch(err){
        next(err)
    }
}



module.exports={
    validateToken,
    refreshToken
}