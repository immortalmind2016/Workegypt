

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Message=new Schema({
    info:{

        from:{ 
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        to:{ 
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    conversation:{
        type:Schema.Types.ObjectId,
        ref:"Conversation"
        
    },
    updated:{
        type:Boolean,
        default:true
    }
    ,
    text:{
        type:String
    },
    created_date:
    {type: Date, default: Date.now}
    
    
    
    
})


module.exports=mongoose.model("Message",Message)