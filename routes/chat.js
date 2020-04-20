const Router=require("express").Router()
const {getConversation}=require("../controller/chat/chat")
const passport=require("../services/jwtPassport")

Router.get("/:id",getConversation)


module.exports=Router;