const {noteService,commentService} = require('../../service');
const jwt = require('jsonwebtoken');

const write = async(req,res)=>{
    console.log("컨트롤러 동작");
    const dataValue = req.body;
    try{
        console.log(req.writeUser.userIdx)
        await noteService.writeBoard(req.writeUser.userIdx,dataValue.title,dataValue.content)
        res.send({data: 'Success'})
    }catch(err){
        console.log(err)
        res.send({message:"Failed"})
    }
}

const get = async(req, res)=>{
    console.log("controller: working")
    let result;
    try{
        result = await noteService.getBoard(1);
        res.send({data:result});
    }catch(err){
        console.log(err)
        res.send({message:"Failed"})
    }
}

const getMy = async(req, res)=>{
    console.log("controller: working")
    let result;
    try{
        result = await noteService.getBoard(1);
        res.send({data:result});
    }catch(err){
        console.log(err)
        res.send({message:"Failed"})
    }
}

const getOne = async(req, res)=>{
    console.log("CONTROLLER: WORKING");
    const textId = req.params.boardIdx;
    console.log("파라미터 전달 확인"+textId)
    try{
        const result = await noteService.getText(textId);
        const comment= await commentService.getComment(textId);
        const userInfo = req.writeUser
        res.send({data:result, comment:comment,accessUser:userInfo});
    }catch(err){
        console.log(err)
        res.send({message:"Failed"})
    }
}

const deleteContent = async(req,res)=>{
    console.log("CONTROLLER: WORKING");
    const textId = req.params.boardIdx;
    try{
        await noteService.deleteBoard(textId);
        res.send({message:"Success"})
    }catch(err){
        res.send({message:"Failed"})
    }    
}

const update = async(req,res)=>{
    console.log("CONTROLLER: WORKING");
    const boardIdx= req.params.boardIdx;
    try{
        await noteService.updateBoard(boardIdx,req.body.title,req.body.content);
        res.send({message:"Success"})
    }catch(err){
        res.send({message:"Failed"})
    }
    
}

module.exports={
    write, get, getOne, deleteContent, update,getMy
}