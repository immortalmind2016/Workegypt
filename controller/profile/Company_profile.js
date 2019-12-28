var jwt = require('jsonwebtoken');
const User=require("../../model/user")
const ObjectId=require("mongoose").Types.ObjectId
const Company_profile=require("../../model/Company_profile")
const getCompanyProfileData=(req,res,err)=>{
    Company_profile.findOne({user:req.params.id},(err,profile)=>{
   
        res.json({profile})
    }).populate("user")

}

const editCompanyProfileData=(req,res,err)=>{
  const data=req.body.data
  Company_profile.findOneAndUpdate({user:req.user._id},{...data},{new:true},(err,profile)=>{
    res.json({profile})
  }).populate("user")
}

//Experience

module.exports={
    getCompanyProfileData,
    editCompanyProfileData

}
