//@ts-check

const { connection_error } = require('../../lib/common/error');
const {models, Op}= require('../../lib/db')

///회원정보 저장
const saveUser=async({id, pw,age,email,name,nickname,salt})=>{
    try{
        await models['user'].create({
            id: id,
            pw: pw,
            age: age,
            email: email,
            name: name,
            nickname: nickname,
            salt: salt,
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_SAVE_USER_ERROR)
    }
}

// ID로 유저정보 가지고 오기
const getUserId = async(id)=>{
    let results;
    try{
        results = await models['user'].findOne({
            where:{
                id:id
            }
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_GET_USER_BY_ID_ERROR)
    }
    return results
}

// 이메일로 회원정보 가지고 오기
const getEmailData = async(email,name)=>{
    let results;
    try{
        results =await models['user'].findOne({
            where:{
                email:email,
                name:name
            }
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_GET_USER_BY_EMAIL_ERROR)
    }
    return results
}

// id, email, name으로 회원정보 검색
const getPwData = async(id,email,name)=>{
    let results;
    try{
        results =await models['user'].findOne({
            where:{
                id:id,
                email:email,
                name:name,
            }
        })
    }catch(err){
        console.log(err)
        throw new Error(connection_error.REPOSITORY_GET_PW_DATA_ERROR)
    }
    return results
}

// 비밀번호 변경
const changePassword=async(userIdx,{hashPw,salt})=>{
    try{
        await models['user'].update({
            pw: hashPw,
            salt: salt
        },{
            where:{
                userIdx:userIdx,
            }
        })
    }catch(err){
        console.log(err)
        throw new Error(connection_error.REPOSITORY_UPDATE_PW_ERROR)
    }
}


module.exports={
    saveUser,getUserId,getEmailData,getPwData,changePassword
}