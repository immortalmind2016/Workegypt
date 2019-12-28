const mongoose=require("mongoose")
const Schema=mongoose.Schema
const User=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },      
    created_date:{
        type:Date,
        default:new Date().toLocaleString("en-US", {timeZone: "Africa/cairo"})
    },
    last_logout:{
        type:Date,
        default:null
    },
    type:Boolean,
    new:{
        type:Boolean,
        default:true
    }
    
   



})


module.exports=mongoose.model("User",User)