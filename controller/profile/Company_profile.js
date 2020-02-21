var jwt = require('jsonwebtoken');
const User=require("../../model/user")
const ObjectId=require("mongoose").Types.ObjectId
const Company_profile=require("../../model/Company_profile")
const getCompanyProfileData=(req,res,err)=>{
    Company_profile.findOne({_id:req.params.id},(err,profile)=>{
   
        res.json({profile})
    }).populate("user",["name"])

}

const editCompanyProfileData=async(req,res,err)=>{
  const data=req.body.data
  const old=await   Company_profile.findOne({user:req.user._id})

  Company_profile.findOneAndUpdate({user:req.user._id},{...data},{new:true},(err,profile)=>{

    if(data.image){

      let oldImagePath=old.image.replace(url,"")
      fs.unlink("./public"+oldImagePath,(err)=>{
  
      })

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
  })
}

//Experience

module.exports={
    getCompanyProfileData,
    editCompanyProfileData

}
