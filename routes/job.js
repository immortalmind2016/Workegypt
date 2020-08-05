const Router=require("express").Router()
const {
    createJob,
    editJob,
    deleteJob,
    getAllJobs,
    getJob,
    addQuestion,
    removeQuestion,
    editQuestion
}=
require("../controller/job/job")
const passport=require("../services/jwtPassport")
/*
Mainurl : /api/job
mainDataShape:
{data:{your data here}}

*/

Router.post("/",passport.authenticate('jwt', { session: false }),createJob)
Router.delete("/:jobid",passport.authenticate('jwt', { session: false }),deleteJob)
Router.put("/:jobid",passport.authenticate('jwt', { session: false }),editJob)
Router.get("/search/:skip",getAllJobs)
Router.get("/:jobid",getJob)



// company edit question 
/* 
 required data
 {
      data:{
              question:{ question:"" ,
                        answer1:"",
                             .....
                         }
          }
 }
 
 
*/

Router.put("/edit-question/:jobid/:questionid",passport.authenticate('jwt', { session: false }),editQuestion)
//add question 

/* 
required data
 {
    data:{
        id,
        question,
        answer1,
        answer2,
        .....
    }
}

*/
Router.post("/add-question/:jobid",passport.authenticate('jwt', { session: false }),addQuestion)
//required data 
/*
    {
        data:{
            id
        }
    }
*/
Router.delete("/remove-question/:jobid/:questionid",passport.authenticate('jwt', { session: false }),removeQuestion)





module.exports=Router;