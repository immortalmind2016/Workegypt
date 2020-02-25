var jwt = require('jsonwebtoken');
const Job=require("../../model/Job")
const mongoose=require("mongoose")

const Applicant_profile=require("../../model/Applicant_profile")



const getMyJobs=async(req,res,err)=>{
    const applicantProfile=await Applicant_profile.findOne({user:req.user._id});
    if(!applicantProfile)
    return res.sendStatus(404)
     const jobs=await Job.find({"applicants.applicant":applicantProfile}).populate({
    path:"company",
    select:["image"],
    populate: {
        path: 'user',
        model: 'User',
        select:"name"
      } 

    })
res.json({jobs})
 }
module.exports={
    getMyJobs,
 

}
