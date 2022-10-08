const {models, Op}= require('../../lib/db')

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

module.exports={
    saveUser,getUserId,getEmailData,getPwData
}