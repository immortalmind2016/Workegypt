

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Company_applicant=new Schema({
   applicant:{
    type:Schema.Types.ObjectId,
    ref:"User"
   },
   company:{
    type:Schema.Types.ObjectId,
    ref:"User",

   }
})


module.exports=mongoose.model("Company_applicant",Company_applicant)