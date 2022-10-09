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
        console.log(err);
        res.status(400).send({message:"FAILED"});
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
        console.log(err);
    }
    return results
}

// 이메일로 회원정보 가지고 오기
const getEmailData = async({email,name})=>{
    let results;
    console.log("Service layer")
    try{
        results =await models['user'].findOne({
            where:{
                email:email,
                name:name
            }
        })
    }catch(err){
        console.log(err)
    }
    return results
}

// id, email, name으로 회원정보 검색
const getPwData = async({id,email,name})=>{
    let results;
    console.log("Service layer")
    try{
        results =await models['user'].findOne({
            where:{
                id:id,
                email:email,
                name:name
            }
        })
    }catch(err){
        console.log(err)
    }
    return results
}

// 비밀번호 변경
const changePassword=async(userIdx,newPw,newSalt)=>{
    console.log("Service layer")
    try{
        await models['user'].update({
            pw: newPw,
            salt: newSalt
        },{
            where:{
                userIdx:userIdx,
            }
        })
    }catch(err){
        console.log(err)
    }
}


module.exports={
    saveUser,getUserId,getEmailData,getPwData,changePassword
}