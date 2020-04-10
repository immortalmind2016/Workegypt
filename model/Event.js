

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Event=new Schema({
   title:{
       type:String
   },
   desc:{
    type:String
},
time:Object
,
   image_link:{
       type:String
   },
   speakers:Array

   /*
   {
       name,
       image_link
   }
   */,
   agenda:Array,
   going_counter:{
       type:Number,
       default:0
   },
   created_date:{
    type:Date,
    default:Date.now()
    },

   /*
     title,
     desc
   */

})


module.exports=mongoose.model("Event",Event)