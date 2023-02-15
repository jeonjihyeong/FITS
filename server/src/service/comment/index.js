const { connection_error } = require("../../lib/common/error")
const {commentRepo} = require("../../reposiotory")

const writeComment =async(userIdx,noteIdx,comment)=>{
    try{
        await commentRepo.writeComment(userIdx,noteIdx,comment)
    }catch(err){
        if(err.message){throw new Error(err.message)}
        throw new Error(connection_error.SERVICE_WRITE_COMMENT_ERROR)
    }
    return true
}

module.exports={
    writeComment
}