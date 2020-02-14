var jwt = require('jsonwebtoken');
const Job=require("../../model/job")
const mongoose=require("mongoose")
const Company_profile=require("../../model/Company_profile")
const Applicant_profile=require("../../model/Applicant_profile")


const getCompanyJobs=async(req,res,err)=>{
    const jobs=await Job.aggregate([
        {$match:{company:mongoose.Types.ObjectId(req.params.companyid)}},
        {$project:{
            title:1,
            desc:1,
            requirements:1,
            experience:1,
            level:1,
            language:1,
            salary:1,
            type:1,
            open:1,
            quiz_length:{$size:"$quiz"},
            created_date:1,
            quiz_time:1,
            company:1,
            applicantsNo:{$size:"$applicants"},
            rejected:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","rejected"]}
                }
            }},
            positions:1,
            languages:1,
            lang_score:1,
            accepted:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","accepted"]}
                }
            }},
            oncontact:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","oncontact"]}
                }
            }},
            shortlisted:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","shortlisted"]}
                }
            }}
           
    
        }}

    ])
        console.log(err,jobs)
        if(jobs){
            await Job.populate(jobs, {
                path:"company",
            select:["image"],
            populate: {
                path: 'user',
                model: 'User',
                select:"name"
              } 
        
        });
            res.json({jobs})

        }else{
            res.sendStatus(404)
        }
 
}
const jobApplicants=async(req,res,err)=>{
   console.log("JOB APPLICANTS")
   try{
    const company  =await Company_profile.findOne({user:req.user._id})
   
    if(!company){
        return res.json({error:"wrong access"})
    }
  //nested populating 
    const job  =await (await Job.findOne({$and:[{_id:req.params.jobid},{company:company._id}]}))
    .populate({
        path:"applicants.applicant",
    select:["image"],
    populate: {
        path: 'user',
        model: 'User',
        select:"name"
      } 

})
  
    .execPopulate()
    res.json({job})

   }catch(err){
    return res.json({error:err})

   }    
}

const editApplicantStatus=async(req,res,err)=>{
   console.log("EDIT APPLICANT STATUS ",req.params.applicantid)
    try{

     const company  = await Company_profile.findOne({user:req.user._id})
     if(!company){
         return res.json({error:"wrong access"})
     }
     const job = await Job.findOneAndUpdate({$and:[{_id:req.params.jobid},{company:company._id},{"applicants.applicant":req.params.applicantid}]},{$set:{"applicants.$.status":req.body.data.status}},{new:true})
     res.json({job})
    }catch(err){
     return res.json({error:err})
 
    }    
 }
 const applyForJob=async(req,res,err)=>{
    try{
        const applicantProfile  = await Applicant_profile.findOne({user:req.user._id})
        if(!applicantProfile){
            return res.json({error:"wrong access"})
        }
        const applicant={
            applicant:applicantProfile._id,
            quiz_score:req.body.data.quiz_score,
            answers:req.body.data.answers
            
        }
        const job = await Job.findOneAndUpdate({$and:[{_id:req.params.jobid}]},{$push:{"applicants":applicant}},{new:true})
        res.sendStatus(200)
       }catch(err){
        return res.json({error:err})
    
       }    

 }
 const cancelJob=async(req,res,err)=>{
    try{
        const applicantProfile  = await Applicant_profile.findOne({user:req.user._id})
        if(!applicantProfile){
            return res.json({error:"wrong access"})
        }
    
        const job = await Job.findOneAndUpdate({$and:[{_id:req.params.jobid}]},{$pull:{"applicants":{applicant:applicantProfile._id}}},{new:true})
        res.sendStatus(200)
       }catch(err){
        return res.json({error:err})
    
       }    

 }
module.exports={
    getCompanyJobs,
    jobApplicants,
    editApplicantStatus,
    applyForJob,
    cancelJob

}
