const { connection_error } = require("../../lib/common/error")

//회원정보 변경
const chagneUserData =async(userIdx, newData)=>{
    try{
        await models['user'].update({
            ...newData
        },{
            where:{userIdx:userIdx}
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_CHANGE_USER_DATA_ERROR)
    }
}

const checkFollow=async(follower,following)=>{
    try{
        await models['follow'].findOne({
            where:{
                follower: follower,
                following : following
            }
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_CHECK_FOLLOW_ERROR)
    }
}

const getUserProfile=async(userIdx)=>{
    try{
        await models['follow'].findOne({
            where:{
                follower: 8,
                following : 9
            }
        })
    }catch(err){
        console.log(err)
        throw new Error(connection_error.REPOSITORY_CHANGE_USER_DATA_ERROR)
    }
}

const getUserFollower=async(userIdx)=>{
    console.log('1')
}

const getUserFollowing=async(userIdx)=>{
    console.log('2')
}




module.exports={
    chagneUserData,
    checkFollow,
    getUserProfile,
    getUserFollower,
    getUserFollowing
}