import express from 'express';
import { anonymous } from '../../controller';

const anonymousRouter= express.Router();

anonymousRouter.post('/login', anonymous.login);
anonymousRouter.post('/signUp', anonymous.signup);
anonymousRouter.post('/signUpMail',anonymous.sendSignUpMail);
anonymousRouter.post('/findId',anonymous.sendFindIdMail)
anonymousRouter.post('/findPw',anonymous.sendFindPwMail)
anonymousRouter.post('/changePw',anonymous.changePw)
// anonymousRouter.post('/login/kakao',anonymous.kakaoLogin)
// anonymousRouter.post('/login/naver',anonymous.kakaoLogin)


export {anonymousRouter}