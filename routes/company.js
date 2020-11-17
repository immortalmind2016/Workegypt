const Router=require("express").Router()
const {getCompanyJobs,jobApplicants,editApplicantStatus,applyForJob,cancelJob,openContact,opened,subscribe,getProfiles, getCompanies}=require("../controller/company/company")
const passport=require("../services/jwtPassport")
const adminPassport=require("../services/adminPassport")

/*
Mainurl : /api/company
mainDataShape:
{data:{your data here}}
*/
//company get it's own jobs
Router.get("/jobs/:companyid",getCompanyJobs)
//company get it's job applicants
Router.get("/job-applicants/:jobid",passport.authenticate('jwt', { session: false }),jobApplicants)
//returned
/*
for example
{
    job info ,
    applicants:[
        {
            applicant:id,
            image:..,
            user:{
                name:""
            }
        }
    ]
}
*/



// company edit status
Router.put("/job-applicants/:jobid/:applicantid",passport.authenticate('jwt', { session: false }),editApplicantStatus)
//apply job
Router.post("/apply-job/:jobid",passport.authenticate('jwt', { session: false }),applyForJob)
//for job cancelling 
Router.delete("/cancel-job/:jobid/",passport.authenticate('jwt', { session: false }),cancelJob)

Router.post("/open-contact/",passport.authenticate('jwt', { session: false }),openContact)
Router.get("/opened/:id",passport.authenticate('jwt', { session: false }),opened)

Router.post("/subscribe/",passport.authenticate('jwt', { session: false }),subscribe)
Router.get("/profiles/:skip",passport.authenticate('jwt', { session: false }),getProfiles)
Router.get("/:skip",adminPassport.authenticate('jwt', { session: false }),getCompanies)

module.exports=Router;