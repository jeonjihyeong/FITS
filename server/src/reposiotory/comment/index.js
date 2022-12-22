const {models, Op}= require('../../lib/db')

const writeComment=async(userIdx,noteIdx,comment)=>{
    let timestamp = new Date().getTime();
    try{
        await models['comment'].create({
            userIdx: userIdx,
            comment: comment,
            noteIdx: noteIdx,
            created: timestamp
        })
    }catch(err){
        console.log(err);
        throw new Error("REPOSITORY_WRITE_COMMENT_ERROR")
    }
}

const getComment=async(noteIdx)=>{
    let result;
    try{
        result = await models['comment'].findAll({
            include:models['user'],
            where:{
                noteIdx:noteIdx
            }
        })
        return result;
    }catch(err){
        console.log(err);
        throw new Error("REPOSITORY_CHANGE_PW_ERROR")
    }
}

module.exports={
    writeComment, getComment
}