


const Message=require("../../model/Message")
const Conversation=require("../../model/Conversation")
const Applicant_profile=require("../../model/Applicant_profile")
const Company_profile=require("../../model/Company_profile")

const getConversation=async(req,res,err)=>{

  const messages = await Message.find({$or:[{from:req.params.id,to:req.params.id},{to:req.params.id,from:req.params.id}]})
  const applicant=await Applicant_profile.findOne({_id:req.params.id}).populate("user")
  const company=await Company_profile.findOne({_id:req.params.id}).populate("user")
  res.json({messages,user_info:applicant?applicant:company})
  
}
const getConversations=async(req,res,err)=>{


  const conversations = await Conversation.find({$or:[{applicant:req.user._id},{company:req.user._id}]})

  res.json({conversations})
}
const createConversation=async(req,res,err)=>{
    const applicant=await Applicant_profile.findOne({_id:req.params.withid})
    const company=await Company_profile.findOne({_id:req.params.withid})
    if(company){
      new Conversation({
        info: {

          applicant: req.user._id,
          company: company.user

      }
      
      }).save((err,conversation)=>{
        res.json(conversation)
      })
    }else if(applicant){
      new Conversation({
        info: {

          company: req.user._id,
          applicant: applicant._id

      }
      }).save((err,conversation)=>{
        res.json(conversation)
      })
    }
}
module.exports={
    getConversation,
    getConversations,
    createConversation
    
}
