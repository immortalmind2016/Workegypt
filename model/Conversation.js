

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Conversation=new Schema({
    isRead:{
        type:Boolean,
        default:false
    },
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
        type:Date,
        default:Date.now()
    },
    last_update:{
        type:Date,
        default:Date.now()
    }
    
    
})


module.exports=mongoose.model("Conversation",Conversation)