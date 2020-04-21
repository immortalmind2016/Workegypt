const Router=require("express").Router()
const {getConversation,getConversations,createConversation}=require("../controller/chat/chat")
const passport=require("../services/jwtPassport")

Router.get("/:id",getConversation)

Router.get("/",passport.authenticate('jwt', { session: false }),getConversations) //get my conversations

Router.post("/:withid",passport.authenticate('jwt', { session: false }),createConversation)

module.exports=Router;