const anonymousService = require ("./anonymous");
const userService =require("./user")
const noteService= require("./note")
const commentService = require("./comment")

module.exports = {
    anonymousService,
    userService,
    noteService,
    commentService
}