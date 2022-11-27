const token = require("./token");

// 토큰확인
const validateToken = async(req,res,next)=>{
    let accessToken = req.headers.authorization.accessToken;
    console.log("MIDDLE_WARE: WORKING")
    try{
        if(!await token.verifyToken(accessToken)){
            return;
        }
        const writeUserInfo =await token.decodeToken(accessToken);
        req.decode = writeUserInfo;
        next();
    }catch(err){
        console.log(err)
        next(err)
    }
}

const refreshToken = async(req,res,next)=>{
    let accessToken = req.headers.authorization.accessToken;
    let refreshToken = req.headers.authorization.refreshToken;
    try{
        console.log("MIDDLE_WARE: WORKING");
        const decodeToken = token.decodeToken(accessToken);
        const varify_refresh=await token.refreshVerify(refreshToken,decodeToken.email)
        if (varify_refresh===true){
            console.log("리프레쉬 토큰 유효 - accessToken 재발급")
            const new_accessToken = await token.signToken(decodeToken)
            const new_refreshToken = await token.signToken(decodeToken)
            res.send({
                token:{
                    accessToken:new_accessToken,
                    refreshToken:new_refreshToken
            }})
        }
        else{
            console.log("리프레쉬 토큰 유효하지 않음 - 재로그인 필요")
            res.send({message:"refresh Token is invalid"});
        }
    }catch(err){
        next(err)
        console.log(err)
    }
}



module.exports={
    validateToken,
    refreshToken
}