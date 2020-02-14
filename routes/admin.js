const Router=require("express").Router()
const {getWebSiteAnalysis,addVisitor,getAnalysis}=require("../controller/admin/admin")
const passport=require("../services/jwtPassport")


Router.get("/website-analysis/",getWebSiteAnalysis)
Router.get("/analysis/",getAnalysis)

Router.post("/add-visitor/",addVisitor)

module.exports=Router;