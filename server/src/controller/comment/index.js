const { commentService }=require("../../service");

const writeComment=async(req,res,next)=>{
    const {noteIdx,comment} =req.body;
    const {userIdx} = req.decode;
    if(!noteIdx||!userIdx||!comment){
        return next({message:"INVALID REQUEST"})
    }

    try{
        await commentService.writeComment(userIdx,noteIdx,comment)
    }catch(err){
        if(err.message){return next(err)}
        next({message:"CONTROLLER_COMMENT_ERROR"})
    }

    res.send({data:"success"})
}


module.exports={
    writeComment
}