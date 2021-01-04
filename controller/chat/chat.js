


const Message=require("../../model/Message")
const Conversation=require("../../model/Conversation")
const Applicant_profile=require("../../model/Applicant_profile")
const Company_profile=require("../../model/Company_profile")
const User=require("mongoose").model("User")
const mongoose=require("mongoose")
const getConversation=async(req,res,err)=>{
const fields="name"
console.log(req.user)

  const messages = await Message.find({$or:[{"info.from":req.params.id,"info.to":req.user._id},{"info.to":req.params.id,"info.from":req.user._id}]})
  const applicant=await Applicant_profile.findOne({user:req.params.id},"image").populate("user", fields)
  const company=await Company_profile.findOne({user:req.params.id},"image").populate("user",fields )
  let _id=null
  if(messages.length>0)
    _id=messages[0].conversation
  console.log(company)
  res.json({messages,user_profile:applicant?applicant:company,_id})

}

const getConversationById=async(req,res,err)=>{
  const fields="name"
  const applicant=await Applicant_profile.findOne({user:req.params.uid},"image").populate("user", fields)
console.log("APPLICANT ",applicant)
  const conversations1=await Conversation.aggregate([
    {$match:{_id:mongoose.Types.ObjectId(req.params.id)}},
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
  
  const conversations2=await Conversation.aggregate([
    {$match:{_id:mongoose.Types.ObjectId(req.params.id)}},
    {
      $lookup: {
        from:applicant?Applicant_profile.collection.name:Company_profile.collection.name,
        localField: applicant?"info.applicant":"info.company",
        foreignField: "user",
        as: "user_profile"
      }
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: applicant?"info.applicant":"info.company",
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
  
  const messages = await Message.find({_id:req.params.id})
//  const conversations = await Conversation.find({$or:[{applicant:req.user._id},{company:req.user._id}]})
  if(messages.length>1){
    conversations1=[]
    conversations2=[]
  }
  
  res.json({to:conversations1,from:conversations2})
    
  
  }



const getConversations=async(req,res,err)=>{
  console.log("CONVESSS ",req.user)
  const fields="name"
  const applicant=await Applicant_profile.findOne({user:req.user._id},"image").populate("user", fields)

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
  ]).sort({date: -1})
  
  
    
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
const editConversation=async(req,res,err)=>{
try{
 const conversation= await Conversation.findOneAndUpdate({_id:req.params.id},{...req.body},{new:true})
 res.json({conversation})
}catch(e){
  res.status(500).json({error:"error"})
}

}
module.exports={
    getConversation,
    getConversations,
    createConversation,
    getConversationById,
    editConversation
    
}
