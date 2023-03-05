const express=require('express');
const {user}=require('../../controller')
const userRouter= express.Router();

// 회원정보 수정
userRouter.put('/', user.change);
userRouter.delete('/logout',user.logout)
userRouter.post('/follow',user.follow)
userRouter.post('/profile/uploads',user.uploadProfileImage)
userRouter.post('/unfollow',user.unfollow)
userRouter.get('/profile',user.getUserProfile)


module.exports= userRouter