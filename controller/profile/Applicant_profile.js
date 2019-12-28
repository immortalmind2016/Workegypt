var jwt = require('jsonwebtoken');
const User=require("../../model/user")
const ObjectId=require("mongoose").Types.ObjectId
const Applicant_profile=require("../../model/Applicant_profile")
const Company_profile=require("../../model/Company_profile")
const getApplicantProfileData=(req,res,err)=>{
 
    Applicant_profile.findOne({user:req.params.id},(err,profile)=>{
        console.log("USER ",req.user)
        console.log("PROFILE ",err)
        res.json({profile})
    }).populate("user")

}

const editApplicantProfileData=(req,res,err)=>{
  const data=req.body.data
  Applicant_profile.findOneAndUpdate({user:req.user._id},{...data},{new:true},(err,profile)=>{
    res.json({profile})
  }).populate("user")
}

//Experience

module.exports={
    getApplicantProfileData,
    editApplicantProfileData

}
