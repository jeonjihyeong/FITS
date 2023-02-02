const app = express()
const port = 3000
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './src/lib/index';
import router from './src/router';
import { connection_error, server_warning, authentication_error, httpStatus } from './src/lib/common/error';
import logger from './src/lib/common/winston';

require('express-async-errors');

require('dotenv').config();

app.use(bodyParser.json())
app.use(cors());

    
app.use(router.basicRouter);
    
app.use(async function (err, req, res, next) {
  /*500번대에러가 나오면 추가적인 정보를 프론트로 넘기지 않고 로깅으로 관리*/
  /*에러를 각 코드에서 상속하기 보단 에러 처리기에서 한번에 처리한다.*/
  console.log("에러처리기 오는지 확인");
  if (Object.keys(connection_error).find(key => connection_error[key] === err.message)) {
    logger.error(err.message);
    return res.status(httpStatus.server_error).send(undefined);
  }

  if (Object.keys(server_warning).find(key => server_warning[key] === err.message)) {
    logger.warn(err.message);
    return res.status(httpStatus.ok).send(err.message);
  }

  if (Object.keys(authentication_error).find(key => authentication_error[key] === err.message)) {
    logger.error(err.message);
    return res.status(httpStatus.invalid_token).send(err.message);
  }

  logger.error(err.message);
  res.send({ message: '시스템 오류가 발생했습니다. 잠시 후 시도해주세요.' });
  next();
  return;
})
      
app.listen(port, async () => {
  console.log(`FITS_SERVER_LISTENING_ON_PORT ${port}`)
  await db.initialize()
})