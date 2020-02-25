

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Company_profile=new Schema({
    cover_image:{
        type:String,
        defualt:""
  
    },
    company_about:{type:String,default:""},
    subribe:{
      type:String,
      default:"None"
    },
    branding_video:{
      type:String
    },
    social_links:{
      type:Object,
      default:{
        facebook:String,
        twitter:String,
        insta:String,
        linkedin:String
      }
    },
    image:{
        type:String,
        default:null
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    
})


module.exports=mongoose.model("Company_profile",Company_profile)