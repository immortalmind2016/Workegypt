const Router=require("express").Router()
const {getMyJobs,}=require("../controller/applicant/applicant")
const passport=require("../services/jwtPassport")


Router.get("/my-jobs/",passport.authenticate('jwt', { session: false }),getMyJobs)


module.exports=Router;