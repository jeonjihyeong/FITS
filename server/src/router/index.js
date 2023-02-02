import express from 'express';
import middleware from '../lib/common/middleware';
import {anonymousRouter} from './anonymous';
import noteRouter from './note';
import commentRouter from './comment';
import userRouter from './user';

const basicRouter= express.Router();
basicRouter.use('/',anonymousRouter)
basicRouter.get('/refresh',middleware.refreshToken)
basicRouter.use('/note',middleware.validateToken,noteRouter)
basicRouter.use('/comment',middleware.validateToken,commentRouter)
basicRouter.use('/user',middleware.validateToken,userRouter)

export default{
    basicRouter
}