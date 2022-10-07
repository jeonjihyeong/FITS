const express=require('express');
const {anonymous}=require('../../controller')
const anonymousRouter= express.Router();

anonymousRouter.post('/login', anonymous.login);
anonymousRouter.post('/signUp', anonymous.signup);
anonymousRouter.post('/signUpMail',anonymous.signUp_mail);
anonymousRouter.post('/findId',anonymous.SendfindIdMail)

module.exports= anonymousRouter