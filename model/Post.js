

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Post=new Schema({
   video_link:{
       type:String
   },
   video:Boolean,
   image_link:{
       type:String
   },
   text:{
       type:String,
       default:""
   },
   created_date:{
    type:Date,
    default:Date.now()
    },
   

})


module.exports=mongoose.model("Post",Post)