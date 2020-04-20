getConversation


const Message=require("../../model/Message")
const Conversation=require("../../model/Conversation")

const getConversation=async(req,res,err)=>{
  const messages = await Message.find({conversation:req.params.convid})


  res.json({messages})
}
module.exports={
    getConversation
}
