const Router=require("express").Router()
const {uploadEvent,editEvent,deleteEvent,going,getMoreEvents,getEvents}=require("../controller/event/event")
const adminPassport=require("../services/adminPassport")

Router.post("/",uploadEvent)
Router.put("/:id",adminPassport.authenticate('jwt', { session: false }),editEvent)
Router.delete("/:id",adminPassport.authenticate('jwt', { session: false }),deleteEvent)
Router.get("/",getEvents)
Router.get("/more/:skip/",getMoreEvents)
Router.post("/going",going)

module.exports=Router;