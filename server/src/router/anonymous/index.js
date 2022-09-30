const express=require('express');
const {anonymous}=require('../../controller')
const anonymousRouter= express.Router();

anonymousRouter.post('/login', anonymous.login);

module.exports= anonymousRouter