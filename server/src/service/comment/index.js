const {commentRepo} = require("../../repository")

const writeComment =async(userIdx,noteIdx,comment)=>{
    try{
        await commentRepo.writeComment(userIdx,noteIdx,comment)
    }catch(err){
        if(err.message){throw new Error(err.message)}
        throw new Error("SERVICE_WRITE_COMMENT_ERROR")
    }
}

module.exports={
    writeComment
}