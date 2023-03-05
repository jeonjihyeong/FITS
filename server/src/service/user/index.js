const { connection_error } = require("../../lib/common/error")
const redisClient = require("../../lib/common/redis.util")
const { userRepo } = require("../../reposiotory")

const logout=async(id)=>{
    let logOutResult
    try{
        logOutResult = await redisClient.del(id)
    }catch(err){
        throw new Error(connection_error.SERVICE_DELETE_USER_IP_ERROR)
    }
    return logOutResult
}

const follow = async(follower,following)=>{
    await _checkFollow(follower,following)
    try{
        
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_SET_FOLLOW_ERROR)
    }
}

const unFollow = async(follower,following)=>{
    await _checkFollow(follower,following)
    try{
        
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_DELETE_FOLLOW_ERROR)
    }
}

const _checkFollow = async(follower,following) => {
    try{
        await userRepo.checkFollow(follower,following)
    }catch(err){
        if(err.message)throw new Error(err.message)
        throw new Error(connection_error.SERVICE_CHECK_FOLLOW_ERROR)
    }
}

const getUserProfile = async(userIdx) =>{
    let userProfile
    try{
        userProfile = await _getFollowAndUserInfo(userIdx)
    }catch(err){
        if(err.message)throw new Error(err.message)
        console.log('안돼')
        // throw new Error(connection_error.SERVICE_GET_PROFILE_ERROR)
    }
    return userProfile
}

const _getFollowAndUserInfo = async(userIdx) =>{
    const profile = await userRepo.getUserProfile(userIdx)
    const follower = await userRepo.getUserFollower(userIdx)
    const following = await userRepo.getUserFollowing(userIdx)

    console.log(profile)
    return {
        profile:profile,
        follower: follower,
        following: following
    }
}

module.exports={
    logout,
    follow,
    unFollow,
    getUserProfile
}