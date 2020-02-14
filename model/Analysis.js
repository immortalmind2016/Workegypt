const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Analysis=new Schema({
    visitor:{
        type:String
   
    },
    created_date:{
        type:Date,
        default:new Date().toLocaleString("en-US", {timeZone: "Africa/cairo"})

    }
   

    
   



})


module.exports=mongoose.model("Analysis",Analysis)