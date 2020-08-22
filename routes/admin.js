const Router=require("express").Router()
const {getWebSiteAnalysis,addVisitor,getAnalysis,getTests,login}=require("../controller/admin/admin")
const adminPassport=require("../services/adminPassport")
const bcrypt=require("bcrypt")

Router.get("/website-analysis/",adminPassport.authenticate('jwt', { session: false }),getWebSiteAnalysis)
Router.get("/analysis/",adminPassport.authenticate('jwt', { session: false }),getAnalysis)

Router.post("/",login)



Router.post("/add-visitor/",addVisitor)

module.exports=Router;