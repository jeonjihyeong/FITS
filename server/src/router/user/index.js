const express=require('express');
const {user}=require('../../controller')
const userRouter= express.Router();

// 회원정보 수정
userRouter.put('/', user.change);
userRouter.delete('/logout',user.logout)


module.exports= userRouter