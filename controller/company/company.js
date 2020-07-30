var jwt = require('jsonwebtoken');
const Job=require("../../model/Job")
const mongoose=require("mongoose")
const Company_profile=require("../../model/Company_profile")
const Applicant_profile=require("../../model/Applicant_profile")

const Company_applicant=require("../../model/Company_applicant")

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
            draf:1,
            job_type:1,
            location:1,
            city:1,
            career_level:1,
            years_of_experience:1,
            salary_range:1,
            number_of_vacancies:1,
            job_role:1,
            hide_salary:1,
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


 const openContact=async(req,res,err)=>{
    const applicant=req.body.data.id
    const companyProfile = await Company_profile.findOneAndUpdate({user:req.user._id,"subscribe.count":{$gte:1}},{$inc:{"subscribe.count":parseInt(-1)}},()=>{})
    if(companyProfile){
 
        new Company_applicant({
            applicant,
            company:req.user._id
        }).save(()=>{
            res.sendStatus(200)
        })
    }else{
        res.sendStatus(404).json({error:"not found"})
    }
   
 }
 const getProfiles=async(req,res,err)=>{

        let size=25,
        skip=req.params.skip*size
       const profiles=await Applicant_profile.find({},["image"]).populate("user",["name","job_title","live_in","age"]).limit(size).skip(skip)
   
        res.json({profiles})
 }
 const opened=async(req,res,err)=>{
    const applicant=req.params.id
    const companyApp = await Company_applicant.findOne({company:req.user._id,applicant:req.params.id})
    console.log(applicant,companyApp)
    if(companyApp){
 
        res.sendStatus(200)
    }else{
        res.sendStatus(404)
    }
   
 }
 const subscribe=async(req,res,err)=>{
     const {type}=req.body.data
     const plans={
         gold:30,
         prem:20,
         silver:10
     }
    const plans_=Object.keys(plans)
 
    if (plans_.indexOf(type)==-1)
     return res.status(404).json({err:"Plan not found"})
    try{
    Company_profile.findOneAndUpdate({user:req.user._id},{
        subscribe:{ count:plans[type],
            type
        }
        },{new:true},(err,doc)=>{
            if(!doc){
                return res.sendStatus(404)
            }
            else {
                return res.json({done:true})
            }
        })
       
    
       }catch(err){
        return res.json({error:err})
    
       }    

 }
module.exports={
    getCompanyJobs,
    jobApplicants,
    editApplicantStatus,
    applyForJob,
    cancelJob,
    openContact,
    subscribe,
    opened,
    getProfiles

}
