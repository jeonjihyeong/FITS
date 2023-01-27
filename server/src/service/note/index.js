const { noteRepo, commentRepo } = require("../../reposiotory")
const pagination = require("../../lib/common/pagination")

const writeNote =async(userIdx,title,content)=>{
    try{
        await noteRepo.saveNote(userIdx,title,content)
    }catch(err){
        if(err.message){throw new Error(err.message)}
        throw new Error("SERVICE_WRITE_NOTE_ERROR")
    }
}

const getNote = async(page)=>{
    let result;
    try{
        const paginateData =pagination.getPage(page)
        result = await noteRepo.getNote(paginateData);
        res.send({data:result,paginate:paginateData});
    }catch(err){
        if(err.message){throw new Error(err.message)}
        logger.error("CONTROLLER_GET_NOTE_ERROR");
        return undefined;
    }
}


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

const getOneNote = async(noteIdx,accessUser)=>{
    let result
    try{
        result = {
            data:await noteRepo.getText(noteIdx),
            comment:await commentRepo.getComment(noteIdx),
            accessUser:accessUser
        }
    }catch(err){
        if(err.message){throw new Error(err.message)}
        throw new Error("SERVICE_GET_ONE_NOTE_ERROR")
    }
    return result
}

const deleteNoteContent = async(noteIdx) =>{
    
    try{
        await noteRepo.deleteNote(noteIdx);
    }catch(err){
        if(err.message){throw new Error(err.message)}
        next({message:"SERVICE_DELETE_NOTE_ ERROR"})
    }
    return {message:"Success"}
}

const updateNote = async(noteIdx,title,content)=>{
    try{
        await noteRepo.updateNote(noteIdx, title, content)
    }catch(err){
        if(err.message){throw new Error(err.message)}
        throw new Error("SERVICE_UPDATE_NOTE_ERROR")
    }

    return {data:"success"}
}

module.exports = {
    writeNote,
    getNote,
    getMyNote,
    getOneNote,
    deleteNoteContent,
    updateNote
}