const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser')
const {db}= require('./src/lib/index')
const router = require('./src/router')
const error =require('./src/lib/common/error')
// const morgan = require('morgan');
require('dotenv').config();

app.use(bodyParser.json())
// app.use(morgan())
app.use(cors());

app.use((err,req,res,next)=>{
  console.log(err.message);
  res.json({message:error.message})
});
app.use(router.basicRouter);

app.listen(port, async () => {
  console.log(`FITS_SERVER_LISTENING_ON_PORT ${port}`)
  await db.initialize()
})