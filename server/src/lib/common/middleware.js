const token = require("./token");

// 토큰확인
const validateToken = async(req,res,next)=>{
    let accessToken = req.headers.authorization;
    console.log("MIDDLE_WARE: WORKING")
    try{
        if(!await token.verifyToken(accessToken)){
            res.send({message : "expired token"})
            return;
        }
        const writeUserInfo =await token.decodeToken(accessToken);
        req.writeUser = writeUserInfo;
        next();
    }catch(err){
        console.log(err)
    }
}



module.exports={
    validateToken,
}