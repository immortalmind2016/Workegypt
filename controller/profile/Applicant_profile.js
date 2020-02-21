const jwt = require('jsonwebtoken');
const User=require("../../model/user")
const ObjectId=require("mongoose").Types.ObjectId
const Applicant_profile=require("../../model/Applicant_profile")
const Company_profile=require("../../model/Company_profile")
const {url} = require("../../config");
const fs =require("fs")
const getApplicantProfileData=(req,res,err)=>{
 
    Applicant_profile.findOne({_id:req.params.id},(err,profile)=>{
        console.log("USER ",req.user)
        console.log("PROFILE ",err)
        res.json({profile})
    }).populate("user")

}

const editApplicantProfileData=async(req,res,err)=>{
  const data=req.body.data
  const old=await   Applicant_profile.findOne({user:req.user._id})
  Applicant_profile.findOneAndUpdate({user:req.user._id},{...data},{new:true},(err,profile)=>{
    
    if(data.image){
        try{
          let oldImagePath=old.image.replace(url,"")
          fs.unlink("./public"+oldImagePath,(err)=>{
      
          })
        }catch(e){

        }
     


    }
    res.json({profile})
  }).populate("user")
}

//Experience

module.exports={
    getApplicantProfileData,
    editApplicantProfileData

}
