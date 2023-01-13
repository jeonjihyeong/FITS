const { noteRepo, commentRepo } = require("../../reposiotory")
const pagination = require("../../lib/common/pagination")

const writeNote =async(userIdx,title,content)=>{
    try{
        await noteRepo.writeBoard(userIdx,title,content)
    }catch(err){
        if(err.message){throw new Error(err.message)}
        throw new Error("SERVICE_WRITE_NOTE_ERROR")
    }
}

const getNote = async(page)=>{
    let result;
    try{
        const paginateData =pagination.getPage(page)
        result = await noteRepo.getBoard(paginateData);
        res.send({data:result,paginate:paginateData});
    }catch(err){
        if(err.message){throw new Error(err.message)}
        throw new Error("CONTROLLER_GET_NOTE_ERROR")
    }
}


const getMyNote = async(page)=>{
    let result;
    try{
        const paginateData =pagination.getPage(page)
        result = await noteRepo.getBoard(paginateData);
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
        await noteRepo.deleteBoard(noteIdx);
    }catch(err){
        if(err.message){throw new Error(err.message)}
        next({message:"SERVICE_DELETE_NOTE_ ERROR"})
    }
    return {message:"Success"}
}

const updateNote = async(noteIdx,title,content)=>{
    try{
        await noteRepo.updateBoard(noteIdx, title, content)
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