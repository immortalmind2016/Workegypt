var jwt = require('jsonwebtoken');
const User=require("../../model/user")
const ObjectId=require("mongoose").Types.ObjectId
const Company_profile=require("../../model/Company_profile")

const getCompanyProfileData=(req,res,err)=>{
    Company_profile.findOne({user:req.params.id},(err,profile)=>{
   console.log(profile,"PROIFLE",req.params)
        res.json({profile})
    }).populate("user",["name"])

}


const editCompanyProfileData=async(req,res,err)=>{
  const data=req.body.data
  const old=await   Company_profile.findOne({user:req.user._id})
  await User.findOneAndUpdate({_id:req.user._id},{new:false},()=>{})

  Company_profile.findOneAndUpdate({user:req.user._id},{...data,last_update:Date.now(),new:false},{new:true},(err,profile)=>{

    if(data.image){
      try{
      let oldImagePath=old.image.replace(url,"")
      fs.unlink("./public"+oldImagePath,(err)=>{
  
      })
    }catch(e){

    }

    }
    if(data.cover_image){
      try{
       
      let oldCoverPath=old.cover_image.replace(url,"")
      fs.unlink("./public"+oldCoverPath,(err)=>{
  
      })
      }catch(e){

      }
   

    }
    res.json({profile})
  }).populate("user",["name","_id"])
}

//Experience

module.exports={
    getCompanyProfileData,
    editCompanyProfileData,
    

}
