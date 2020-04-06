

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
       type:string,
       default:""
   }
   

})


module.exports=mongoose.model("Post",Post)