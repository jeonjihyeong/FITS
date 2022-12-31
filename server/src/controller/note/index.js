const {noteRepo,commentRepo} = require('../../reposiotory');
const pagination =require('../../lib/common/pagination')

const write = async(req,res)=>{
    console.log("CONTROLLER: WORKING");
    const {title,content} = req.body;
    try{
        await noteRepo.writeBoard(req.decode.userIdx,title,content)
        res.send({data: 'Success'})
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_WRITE_NOTE_ERROR"})
    }
}

const get = async(req, res)=>{
    console.log("CONTROLLER: WORKING");
    const {page}=req.params;
    console.log(page)
    let result;
    try{
        const paginateData =await pagination.getPage(page)
        result = await noteRepo.getBoard(paginateData);
        res.send({data:result,paginate:paginateData});
    }catch(err){
        if(err.message){next(err)}
        next({message:"CONTROLLER_GET_NOTE_ERROR"})
    }
}

const getMy = async(req, res)=>{
    console.log("CONTROLLER: WORKING");
    let result;
    try{
        result = await noteRepo.getBoard(1);
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
        next({message:"CONTROLLER_GET_ONE_NOTE_ERROR"})
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
    write, get, getOne, deleteContent, update,getMy
}