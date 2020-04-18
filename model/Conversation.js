

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Conversation=new Schema({
    info:{

        applicant:{ 
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        company:{ 
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    create_date:{
        type:String,
        default:Date.now()
    }
    
    
})


module.exports=mongoose.model("Conversation",Conversation)