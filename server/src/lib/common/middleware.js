const token = require("./token");

// 토큰확인
const validateToken = async(req,res,next)=>{
    let accessToken = req.headers.authorization;
    console.log("MIDDLE_WARE: WORKING")
    try{
        if(!await token.verifyToken(accessToken)){
            
        }
        const writeUserInfo =await token.decodeToken(accessToken);
        req.decode = writeUserInfo;
        next();
    }catch(err){
        console.log(err)
        next(err)
    }
}



module.exports={
    validateToken,
}