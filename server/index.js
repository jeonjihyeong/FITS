const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser')
const {db}= require('./src/lib/index')
const router = require('./src/router')
// const morgan = require('morgan');

app.use(bodyParser.json())
// app.use(morgan())
app.use(cors());
app.use(router.basicRouter);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  await db.initialize()
})