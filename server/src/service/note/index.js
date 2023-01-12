const { noteRepo } = require("../../reposiotory")

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
        if(err.message){next(err)}
        next({message:"CONTROLLER_GET_NOTE_ERROR"})
    }
}

module.exports = {
    writeNote,
    getNote
}