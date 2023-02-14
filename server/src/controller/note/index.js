const { server_warning, connection_error } = require('../../lib/common/error');
const {noteService} = require('../../service')

const writeNote = async(req,res,next)=>{
    const {title,content} = req.body;
    const {userIdx} = req.decode
    if(!title || !content||!userIdx) {
        next({message:server_warning.INVALID_REQUEST_WARN})
    }
    try{
        await noteService.writeNote(req.decode.userIdx,title,content)
    }catch(err){
        if(err.message){next(err)}
        next({message:connection_error.CONTROLLER_WRITE_NOTE_ERROR})
    }
    res.send({data: 'Success'})
}

const getNote = async(req, res,next)=>{
    const {page}=req.params;
    let result;
    try{
        result = await noteService.getNote(page);
        if(!result) return result;
    }catch(err){
        throw new Error(connection_error.CONTROLLER_GET_NOTE_ERROR)
    }
    const {data, paginate} = result
    res.send({data:data, paginate:paginate});
}

// const getMyNote = async(req, res,next)=>{
//     let result;
//     try{
//         result = await noteRepo.getBoard();
//         res.send({data:result});
//     }catch(err){
//         if(err.message){next(err)}
//         next({message:connection_error.CONTROLLER_GET_MY_NOTE_ERROR})
//     }
// }

const getOneNote = async(req, res)=>{
    const {noteIdx} = req.params;
    const accessUser = req.decode
    let result;
    try{
        result = await noteService.getOneNote(noteIdx,accessUser)
    }catch(err){
        if(err.message){next(err)}
        next({message:connection_error.CONTROLLER_GET_ONE_NOTE_ERROR})
    }
    res.send(result)
}

const deleteNoteContent = async(req,res)=>{
    const {noteIdx} = req.params;
    if(!noteIdx){
        return next({message:server_warning.INVALID_REQUEST_WARN})
    }
    let result;
    try{
        result = await noteService.deleteNoteContent(noteIdx);
    }catch(err){
        if(err.message){next(err)}
        next({message:connection_error.CONTROLLER_DELETE_NOTE_ERROR})
    }    
    res.send(result)
}

const updateNote = async(req,res)=>{
    const {noteIdx}= req.params;
    const {title,content}= req.body
    if(!noteIdx|!title|!content){
        return next({message:server_warning.INVALID_REQUEST_WARN})
    }
    try{
        await noteService.updateNote(noteIdx,title,content);
    }catch(err){
        if(err.message)next(err)
        next({message:connection_error.CONTROLLER_UPDATE_NOTE_ERROR})
    }
    res.send({message:"Sucess"});
}

const likeNote = async(req,res,next)=>{
    const {noteIdx}=req.params;
    const {userIdx} = req.decode;
    if(!noteIdx)next({message:server_warning.INVALID_REQUEST_WARN})
    try{
        await noteService.likeNote(noteIdx,userIdx)
    }catch(err){
        if(err.message)next(err)
        next({message:connection_error.CONTROLLER_GET_LIKE_ERROR})
    }
    res.send({message:"성공"})
}

module.exports={
    writeNote,
    getNote,
    // getMyNote,
    getOneNote,
    deleteNoteContent,
    updateNote,
    likeNote
}