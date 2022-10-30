const {models, Op}= require('../../lib/db')

// 게시판 글 작성하기
const writeBoard=async(userIdx,title, content)=>{
    let result;
    let timestamp = new Date().getTime();
    try{
        result = await models['note'].create({
            userIdx: userIdx,
            title: title,
            content: content,
            created: timestamp
        })
    }catch(err){
        console.log(err);
    }
}

//게시판 리스트 글 가지고 오기
const getBoard= async()=>{ 
    let result;
    try{
        result = await models['note'].findAll({
            include:models['user'].name,
            order:[['created','DESC']]
        })
        // res.data=result;
        
    }catch(err){
        console.log(err);
    }
    return result;
}

// 게시판 글 가지고 오기
const getText = async(boardIdx)=>{
    let result;
    try{
        result = await models['note'].findOne({
            include:models['user'],
            where:{
                boardIdx: boardIdx
            }
    })
    }catch(err){
        console.log(err);
    }
    return result;
}

// 게시판 글 삭제
const deleteBoard = async(boardIdx)=>{
    try{
        await models['note'].destroy({
            where:{
                boardIdx: boardIdx
            }
        })
    }catch(err){
        console.log(err);
    }
    return
}

// 게시판 수정
const updateBoard = async(boardIdx, title, content)=>{
    try{
        await models['note'].update({
            title:title,
            content:content
        },{
            where:{boardIdx:boardIdx}
        })
    }catch(err){
        console.log(err);
    }
}



module.exports = {
    writeBoard, getBoard, getText,deleteBoard, updateBoard
}