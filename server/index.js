const express = require('express')
const app = express()

app.get('/', function (req, res) {
  console.log("gdgd")
})

app.listen(3000,()=> {
    console.log("hi")
})