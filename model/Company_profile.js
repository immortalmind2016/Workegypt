

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Company_profile=new Schema({
    cover_image:{
        type:String
  
    },
    company_about:{type:String},
    social_links:{
        facebook:String,
        twitter:String,
        insta:String,
        linkedin:String
    },
    company:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
    
})


module.exports=mongoose.model("Company_profile",Company_profile)