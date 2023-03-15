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
    // const {title, id} = req.query
    // console.log(id)
    // const searchOption = {
    //     title:title,
    //     id:id
    // }
    // TODO: searchOption 을 쿼리로 추가 하나의 객체로 묶기 or 
    //미리 지정해놓고 서버에서 객체로 묶어서 where 로 find
    let result;
    try{
        result = await noteService.getNote(page);
    }catch(err){
        if(err.message) return next(err)
        next({message:connection_error.CONTROLLER_GET_NOTE_ERROR})
    }
    const {data, paginate} = result
    res.send({data:data, paginate:paginate});
}

const getMyNote = async(req, res,next)=>{
    const {page, userIdx}=req.query
    let result;
    try{
        result = await noteRepo.getMyNote(page,userIdx);
    }catch(err){
        if(err.message) return next(err)
        next({message:connection_error.CONTROLLER_GET_MY_NOTE_ERROR})
    }
    const {data, paginate} = result
    res.send({data:data, paginate:paginate});
}

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
    res.send({message:"성공"});
}

const likeNote = async(req,res,next)=>{
    const {noteIdx}=req.params;
    const {userIdx} = req.decode;
    if(!noteIdx)next({message:server_warning.INVALID_REQUEST_WARN})
    try{
        await noteService.likeNote(noteIdx,userIdx)
    }catch(err){
        if(err.message)next(err)
        next({message:connection_error.CONTROLLER_SET_LIKE_ERROR})
    }
    res.send({message:"성공"})
}


const unLikeNote = async(req,res,next)=>{
    const {noteIdx}=req.params;
    const {userIdx} = req.decode;
    
    if(!noteIdx)next({message:server_warning.INVALID_REQUEST_WARN})
    
    try{
        await noteService.unLikeNote(noteIdx,userIdx)
    }catch(err){
        if(err.message)next(err)
        next({message:connection_error.CONTROLLER_DELETE_LIKE_ERROR})
    }
    res.send({message:"성공"})
}

module.exports={
    writeNote,
    getNote,
    getMyNote,
    getOneNote,
    deleteNoteContent,
    updateNote,
    likeNote,
    unLikeNote
}