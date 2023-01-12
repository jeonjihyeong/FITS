const {noteRepo,commentRepo} = require('../../reposiotory');
const pagination =require('../../lib/common/pagination')

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

const get = async(req, res)=>{
    console.log("CONTROLLER: WORKING");
    const {page}=req.params;
    console.log(page)
    let result;
    try{
        await noteService.getNote(page)
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_GET_NOTE_ERROR"})
    }
    res.send({data:result,paginate:paginateData});
}

const getMy = async(req, res)=>{
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

const getOne = async(req, res)=>{
    console.log("CONTROLLER: WORKING");
    const textId = req.params.noteIdx;
    console.log("파라미터 전달 확인"+textId)
    try{
        const result = await noteRepo.getText(textId);
        const comment= await commentRepo.getComment(textId);
        const userInfo = req.decode
        res.send({data:result,comment:comment, accessUser:userInfo});
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_GET_ONE_NOT_ERROR"})
    }
}

const deleteContent = async(req,res)=>{
    const textId = req.params.noteIdx;
    try{
        await noteRepo.deleteBoard(textId);
        res.send({message:"Success"})
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_DELETE_NOTE_ERROR"})
    }    
}

const update = async(req,res)=>{
    const boardIdx= req.params.boardIdx;
    try{
        await noteRepo.updateBoard(boardIdx,req.body.title,req.body.content);
        res.send({message:"Success"})
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_UPDATE_NOTE_ERROR"})
    }
}

module.exports={
    writeNote, get, getOne, deleteContent, update,getMy
}