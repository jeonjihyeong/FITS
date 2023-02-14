const { server_warning, connection_error } = require("../../lib/common/error");
const { commentService }=require("../../service");

const writeComment=async(req,res,next)=>{
    const {noteIdx,comment} =req.body;
    const {userIdx} = req.decode;
    if(!noteIdx||!userIdx||!comment)return next({message:server_warning.INVALID_REQUEST_WARN})

    try{
        await commentService.writeComment(userIdx,noteIdx,comment)
    }catch(err){
        if(err.message){return next(err)}
        next({message:connection_error.CONTROLLER_WRITE_COMMENT_ERROR})
    }

    res.send({data:"success"})
}


module.exports={
    writeComment
}