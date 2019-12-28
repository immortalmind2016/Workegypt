const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Applicant_profile=new Schema({
    job_title:{
        type:String,
        default:null
    }, 
    skills:Array
    ,
    basic_info:{
        age:Number,
        graduated:String,
        live_in:String
    },
    experience:Array,
    education:Array,
    languages:Array,
    certifications:Array,
    cv_url:String,
    basic_quizes:Array,
   
   
    image:{
        type:String,
        default:null
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
   



})


module.exports=mongoose.model("Applicant_profile",Applicant_profile)



/**
 * const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Applicant_profile=new Schema({
    job_title:{
        type:String,
        default:null
    }, 
    skills:[{name:String}]
    ,
    basic_info:{
        age:Number,
        graduated:String,
        live_in:String
    },
    experience:[{
        title:String,
        at:String,
        location:String,
        from:Date,
        to:Date
    }],
    education:[{
        at:String,
        titld:String,
        location:String,
        from:Date,
        to:Date 
    }],
    languages:[{
        title:String,
        Score:String,
    }],
    certifications:[{
        title:String,
        at:String,
        time:Date 
        
    }],
    cv_url:String,
    basic_quizes:[{
        languages:String,
        score:Number
    }],
   
   
    image:{
        type:String,
        default:null
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
   



})


module.exports=mongoose.model("Applicant_profile",Applicant_profile)
 * 
 */