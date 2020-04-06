const Router=require("express").Router()
const {uploadEvent,editEvent,deleteEvent,going,getMoreEvents,getEvents}=require("../controller/event/event")
const passport=require("../services/jwtPassport")

Router.post("/",uploadEvent)
Router.put("/:id",editEvent)
Router.delete("/:id",deleteEvent)
Router.get("/",getEvents)
Router.get("/more/:skip/",getMoreEvents)
Router.post("/going",going)

module.exports=Router;