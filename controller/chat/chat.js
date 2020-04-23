


const Message=require("../../model/Message")
const Conversation=require("../../model/Conversation")
const Applicant_profile=require("../../model/Applicant_profile")
const Company_profile=require("../../model/Company_profile")
const User=require("mongoose").model("User")

const getConversation=async(req,res,err)=>{
const fields="name"
  const messages = await Message.find({$or:[{"info.from":req.params.id,"info.to":req.user._id},{"info.to":req.params.id,"info.from":req.user._id}]})
  const applicant=await Applicant_profile.findOne({user:req.params.id},"image").populate("user", fields)
  const company=await Company_profile.findOne({user:req.params.id},"image").populate("user",fields )

  res.json({messages,user_profile:applicant?applicant:company})

}





const getConversations=async(req,res,err)=>{
  console.log("CONVESSS ",req.user)
  const fields="name"
  const applicant=await Applicant_profile.findOne({_id:req.params.id},"image").populate("user", fields)

  const conversations=await Conversation.aggregate([
    {$match:{$or:[{"info.applicant":req.user._id},{"info.company":req.user._id}]}},
    {
      $lookup: {
        from:!applicant?Applicant_profile.collection.name:Company_profile.collection.name,
        localField: !applicant?"info.applicant":"info.company",
        foreignField: "user",
        as: "user_profile"
      }
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: !applicant?"info.applicant":"info.company",
        foreignField: "_id",
        as: "user"
      }
    },
    {$unwind: '$user'},
    {$unwind: '$user_profile'},

    {$project:{
      info:1,
      "user_profile.image":1,
   
      "user_profile._id":1,
      "user.name":1,

      "user._id":1
    }}
  ]).sort({_id:-1})
  
  
    
//  const conversations = await Conversation.find({$or:[{applicant:req.user._id},{company:req.user._id}]})

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
