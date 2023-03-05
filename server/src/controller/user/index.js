const { server_warning, connection_error, logic_error } = require('../../lib/common/error');
const {userService} = require('../../service')

const change=async(req,res)=>{
    try{
        const userIdx = req.decode.userIdx
        const newData = req.body
        await userRepo.chagneUserData(userIdx, newData);
        res.send({data:"success"})
    }catch(err){
        console.log(err);
    }
}

const logout=async(req,res,next)=>{
    const {id} = req.decode
    if(!id)return next({message:server_warning.INVALID_REQUEST_WARN})
    let isLogOutSuccess;
    try{
        isLogOutSuccess = await userService.logout(id)
    }catch(err){
        if(err.message)return next(err)
        next({message:connection_error.CONTROLLER_LOGOUT_ERROR})
    }
    if(isLogOutSuccess===0){
        return res.send({data:'already Logout'})
    }
    res.send({data:'success'})
}

const follow = async(req,res,next)=>{
    const {follower, following}=req.body;
    if(!follower||!following)return next({message:server_warning.INVALID_REQUEST_WARN})
    let isFollowSuccess;
    try{
        isFollowSuccess=await userService.follow(follower,following)
    }catch(err){
        if(err.message)return next(err)
        next({message:connection_error.CONTROLLER_SET_FOLLOW_ERROR})
    }
    res.send({data:'success'})
}

const unfollow = async(req,res,next)=>{
    const {follower, following}=req.body;
    if(!follower||!following)return next({message:server_warning.INVALID_REQUEST_WARN})
    let isUnFollowSuccess;
    try{
        isUnFollowSuccess = await userService.unfollow(follower, following)
    }catch(err){
        if(err.message)return next(err)
        next({message:connection_error.CONTROLLER_DELETE_FOLLOW_ERROR})
    }

    res.send({data:'success'})
}

const uploadProfileImage =async(req, res, next)=>{
    const {image, userIdx} = req.body
    res.send({data:'success'})
    // TODO: 프로필 사진 업로드 하는 API 구현
}

const getUserProfile = async(req,res,next)=>{
    const {userIdx} = req.params
    let userProfile;
    try{
        userProfile = await userService.getUserProfile(userIdx)
    }catch(err){
        if(err.message)return next(err)
        next({message:connection_error.CONTROLLER_GET_PROFILE_ERROR})
    }
    // TODO: 프로필 가지고 오는 API 만들기 해당 아이디의 팔로워와 팔로잉 정보 및 이미지
}

module.exports={
    change,
    logout,
    follow,
    unfollow,
    uploadProfileImage,
    getUserProfile
}