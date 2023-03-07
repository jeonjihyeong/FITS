const { connection_error } = require('../../lib/common/error');
const {models, Op}= require('../../lib/db')
const Sequelize = require('sequelize')

// 게시판 글 작성하기
const saveNote=async(userIdx,title, content)=>{
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
        throw new Error(connection_error.REPOSITORY_SAVE_NOTE_ERROR)
    }
}

//게시판 리스트 글 가지고 오기
const getNote= async({limit, offset})=>{ 
    let result;
    try{
        result = await models['note'].findAndCountAll({
            include:[models['user']],
            include:[models['like']],
            // include:[[Sequelize.fn('COUNT', Sequelize.col('models[like].likeIdx')),'likeCount']],
            order:[['created','DESC']],
            distinct:true,
            limit : limit,
            offset : offset
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_GET_NOTE_ERROR)
    }
    return result;
}

//게시판 리스트 글 가지고 오기
const getMyNote= async({limit, offset},userIdx)=>{ 
    let result;
    try{
        result = await models['note'].findAndCountAll({
            include:[models['user']],
            include:[models['like']],
            // include:[[Sequelize.fn('COUNT', Sequelize.col('models[like].likeIdx')),'likeCount']],
            order:[['created','DESC']],
            distinct:true,
            limit : limit,
            offset : offset,
            where :{
                userIdx
            }
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_GET_MY_NOTE_ERROR)
    }
    return result;
}

// 게시판 글 가지고 오기
const getOneNote = async(noteIdx)=>{
    let result;
    try{
        result = await models['note'].findOne({
            include:models['user'],
            where:{
                noteIdx: noteIdx
            }
    })
    }catch(err){
        console.log(err);
        throw new Error(connection_error.REPOSITORY_GET_ONE_NOTE_ERROR)
    }
    return result;
}

// 게시판 글 삭제
const deleteNote = async(noteIdx)=>{
    try{
        await models['note'].destroy({
            where:{
                noteIdx: noteIdx
            }
        })
    }catch(err){
        console.log(err);
        throw new Error(connection_error.REPOSITORY_DELETE_NOTE_ERROR)
    }
    return
}

// 게시판 수정
const updateNote = async(boardIdx, title, content)=>{
    try{
        await models['note'].update({
            title:title,
            content:content
        },{
            where:{boardIdx:boardIdx}
        })
    }catch(err){
        console.log(err);
        throw new Error(connection_error.REPOSITORY_UPDATE_NOTE_ERROR)
    }
}

module.exports = {
    saveNote,
    getNote,
    getMyNote,
    getOneNote,
    deleteNote,
    updateNote
}