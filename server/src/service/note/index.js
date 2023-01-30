//@ts-check

const { noteRepo, commentRepo } = require("../../reposiotory")
const pagination = require("../../lib/common/pagination")
const { connection_error } = require("../../lib/common/error")

/**
 * 
 * @param {*} userIdx 
 * @param {*} title 
 * @param {*} content 
 */
const writeNote =async(userIdx,title,content)=>{
    try{
        await noteRepo.saveNote(userIdx,title,content)
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_WRITE_NOTE_ERROR)
    }
}
/**
 * 
 * @param {*} page 
 * @returns 
 */
const getNote = async(page)=>{
    let result;
    try{
        const paginateData =pagination.getPage(page)
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


/**
 * 
 * @param {*} noteIdx 
 * @param {*} accessUser 
 * @returns 
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


/**
 * 
 * @param {*} noteIdx 
 * @returns 
 */
const deleteNoteContent = async(noteIdx) =>{
    
    try{
        await noteRepo.deleteNote(noteIdx);
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_DELETE_NOTE_ERROR)
    }
    return {message:"Success"}
}


/**
 * 
 * @param {*} noteIdx 
 * @param {*} title 
 * @param {*} content 
 * @returns 
 */
const updateNote = async(noteIdx,title,content)=>{
    try{
        await noteRepo.updateNote(noteIdx, title, content)
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_UPDATE_NOTE_ERROR)
    }

    return {data:"success"}
}

module.exports = {
    writeNote,
    getNote,
    getOneNote,
    deleteNoteContent,
    updateNote
}