const {noteService} = require('../../service')

const writeNote = async(req,res,next)=>{
    console.log("CONTROLLER: WORKING");
    const {title,content} = req.body;
    const {userIdx} = req.decode
    if(!title || !content||!userIdx) {
        next({message:"INVALID REQUEST"})
    }
    try{
        await noteService.writeNote(req.decode.userIdx,title,content)
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_WRITE_NOTE_ERROR"})
    }
    res.send({data: 'Success'})
}

const getNote = async(req, res,next)=>{
    console.log("CONTROLLER: WORKING");
    const {page}=req.params;
    console.log(page)
    let result;
    try{
        result = await noteService.getNote(page);
        if(!result) return result;
    }catch(err){
        logger.error("CONTROLLER_GET_NOTE_ERROR");
        return undefined;
    }
    res.send({data:result,paginate:paginateData});
}

const getMyNote = async(req, res,next)=>{
    console.log("CONTROLLER: WORKING");
    let result;
    try{
        result = await noteRepo.getBoard();
        res.send({data:result});
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_GET_MY_NOTE_ERROR"})
    }
}

const getOneNote = async(req, res)=>{
    console.log("CONTROLLER: WORKING");
    const {noteIdx} = req.params;
    const accessUser = req.decode
    let result;
    try{
        result = await noteService.getOneNote(noteIdx,accessUser)
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_GET_ONE_NOTE_ERROR"})
    }
    res.send(result)
}

const deleteNoteContent = async(req,res)=>{
    const {noteIdx} = req.params;
    if(!noteIdx){
        return next({message:"INVALID REQUEST"})
    }
    let result;
    try{
        result = await noteService.deleteNoteContent(noteIdx);
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_DELETE_NOTE_ERROR"})
    }    
    res.send(result)
}

const updateNote = async(req,res)=>{
    const {noteIdx}= req.params;
    const {title,content}= req.body
    if(!noteIdx|!title|!content){
        return next({message:"INVALID REQUEST"})
    }
    try{
        await noteService.updateNote(noteIdx,title,content);
    }catch(err){
        if(err.message === 'aaa'){next(err + 'aaa')}
        next({message:"CONTROLLER_UPDATE_NOTE_ERROR"})
    }
    return true;
}

module.exports={
    writeNote,
    getNote,
    getMyNote,
    getOneNote,
    deleteNoteContent,
    updateNote,
}