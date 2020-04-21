


const Message=require("../../model/Message")
const Conversation=require("../../model/Conversation")
const Applicant_profile=require("../../model/Applicant_profile")
const Company_profile=require("../../model/Company_profile")

const getConversation=async(req,res,err)=>{
  const messages = await Message.find({conversation:req.params.id})


  res.json({messages})
}
const getConversations=async(req,res,err)=>{
  console.log(req.user)
  const messages = await Message.find({$or:[{applicant:req.user._id},{company:req.user._id}]})
  res.json({messages})
}
const createConversation=async(req,res,err)=>{
    const applicant=await Applicant_profile.findOne({user:req.params.withid})
    const company=await Company_profile.findOne({user:req.params.withid})
    if(company){
      new Conversation({
        info: {

          applicant: req.user._id,
          company: company._id

      }
      
      })
    }else if(applicant){
      new Conversation({
        info: {

          company: req.user._id,
          applicant: applicant._id

      }
      })
    }
}
module.exports={
    getConversation,
    getConversations,
    createConversation
}
