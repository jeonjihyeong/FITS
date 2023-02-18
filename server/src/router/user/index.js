const express=require('express');
const {user}=require('../../controller')
const userRouter= express.Router();

// 회원정보 수정
userRouter.put('/', user.change);
userRouter.delete('/logout',user.logout)
userRouter.post('/follow',user.follow)
userRouter.post('/unfollow',user.unfollow)


module.exports= userRouter