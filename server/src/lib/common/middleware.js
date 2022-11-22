const token = require("./token");

// 토큰확인
const validateToken = async(req,res,next)=>{
    let accessToken = req.headers.authorization.accessToken;
    let refreshToken = req.headers.authorization.refreshToken;
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

    }catch(err){
        console.log(err)
    }
}



module.exports={
    validateToken,
    refreshToken
}