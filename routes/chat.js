const Router=require("express").Router()
const {getConversation,getConversations,getConversationById,editConversation}=require("../controller/chat/chat")
const passport=require("../services/jwtPassport")

Router.get("/:id",passport.authenticate('jwt', { session: false }),getConversation)

Router.get("/",passport.authenticate('jwt', { session: false }),getConversations) //get my conversations
Router.get("/conversation/:id/:uid/:uidfrom",getConversationById) //get my conversations
Router.patch("/conversation/:id",editConversation) //get my conversations


//Router.post("/:withid",passport.authenticate('jwt', { session: false }),createConversation)

module.exports=Router;