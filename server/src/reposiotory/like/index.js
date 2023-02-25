const { connection_error } = require('../../lib/common/error')
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
        throw new Error(connection_error.REPOSITORY_GET_LIKE_ERROR)
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
        throw new Error(connection_error.REPOSITORY_SET_LIKE_ERROR)
    }
}

const dropLike = async(noteIdx,userIdx)=>{
    try{
        await models['like'].delete({
            where:{
                userIdx: userIdx,
                noteIdx: noteIdx,
            }
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_DROP_LIKE_ERROR)
    }
}

const countNoteLike = async(noteIdx, userIdx)=>{
    let results
    try{
        results = await models['like'].findAndCountAll({
            noteIdx
        })
    }catch(err){
        
    }
}

module.exports={
    getUserLike,
    setLike,
    dropLike,
}