const {models, Op}= require('../../lib/db')

const getUserLike = async(noteIdx,userIdx)=>{
    let results
    try{
        results = await models['like'].findOne({
            where:{
                noteIdx: noteIdx,
                userIdx: userIdx
            }
        })
    }catch(err){
        throw new Error("REPOSITORY_WRITE_COMMENT_ERROR")
    }
    return results
}

const setLike = async(noteIdx,userIdx)=>{
    try{
        await models['like'].create({
            userIdx: userIdx,
            noteIdx: noteIdx,
        })
    }catch(err){
        throw new Error("REPOSITORY_WRITE_COMMENT_ERROR")
    }
}

module.exports={
    getUserLike,
    setLike
}