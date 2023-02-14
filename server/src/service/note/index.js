const { noteRepo, commentRepo, likeRepo } = require("../../reposiotory")
const pagination = require("../../lib/common/pagination")
const { connection_error, logic_error } = require("../../lib/common/error")


const writeNote =async(userIdx,title,content)=>{
    try{
        await noteRepo.saveNote(userIdx,title,content)
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_WRITE_NOTE_ERROR)
    }
}

const getNote = async(page)=>{
    let result;
    try{
        const paginateData = pagination.getPage(page)
        result = await noteRepo.getNote(paginateData);
        return {data:result,paginate:paginateData}
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_GET_NOTE_ERROR)
    }
}

/*
미구현상태
const getMyNote = async(page)=>{
    let result;
    try{
        const paginateData =pagination.getPage(page)
        result = await noteRepo.getNote(paginateData);
        res.send({data:result,paginate:paginateData});
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_GET_NOTE_ERROR"})
    }
}
*/

const getOneNote = async(noteIdx,accessUser)=>{
    let result
    try{
        result = {
            data:await noteRepo.getOneNote(noteIdx),
            comment:await commentRepo.getComment(noteIdx),
            accessUser:accessUser
        }
    }catch(err){
        if(err.message){throw new Error(err.message)}
        throw new Error(connection_error.SERVICE_GET_ONE_NOTE_ERROR)
    }
    return result
}


const deleteNoteContent = async(noteIdx) =>{
    
    try{
        await noteRepo.deleteNote(noteIdx);
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_DELETE_NOTE_ERROR)
    }
    return {message:"Success"}
}


const updateNote = async(noteIdx,title,content)=>{
    try{
        await noteRepo.updateNote(noteIdx, title, content)
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_UPDATE_NOTE_ERROR)
    }

    return {data:"success"}
}

const likeNote = async(noteIdx,userIdx)=>{
    await _checkLikedUser(noteIdx, userIdx)

    try{
        await likeRepo.setLike(noteIdx, userIdx)
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_SET_LIKE)
    }

    return true
}

const _checkLikedUser = async(noteIdx, userIdx)=>{
    try{
        const isLike = await likeRepo.getUserLike(noteIdx,userIdx)
        if(!isLike) throw new Error(logic_error.ALREADY_LIKE_NOTE)
    }catch(err){
        throw new Error(connection_error.SERVICE_CHECK_LIKE_ERROR)
    }

    return true
}

module.exports = {
    writeNote,
    getNote,
    getOneNote,
    deleteNoteContent,
    updateNote,
    likeNote
}