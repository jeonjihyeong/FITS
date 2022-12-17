const {userRepo} = require('../../reposiotory')

const change=async(req,res)=>{
    try{
        const userIdx = req.decode.userIdx
        const newData = req.body
        await userRepo.chagneUserData(userIdx, newData);
    }catch(err){
        console.log(err);
    }
}

module.exports={
    change
}