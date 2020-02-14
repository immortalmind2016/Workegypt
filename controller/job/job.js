var jwt = require('jsonwebtoken');
const Job=require("../../model/job")
const Company_profile=require("../../model/Company_profile")
const mongoose=require("mongoose")


const createJob=async(req,res,err)=>{
    Company_profile.findOne({user:req.user._id},(err,company)=>{
        const {
            title,
            desc,
            requirements,
            experience,
            level,
            language,
            salary,
            type,
         
        }=req.body.data
        let newJob=new Job({
            title,
            desc,
            requirements,
            experience,
            level,
            language,
            salary,
            type,
            open:true,
            applicants:[],
            company:company._id,
            quiz:[]
    
        })
        
        newJob.save(async(err,job)=>{
            if(err){
              
                
                res.json({error:err})
                return
            }

            await Job.populate(job, {
                path:"company",
            select:["image"],
            populate: {
                path: 'user',
                model: 'User',
                select:"name"
              } 
        
        })
        res.json({job})
    
    
            
    
          
           
        })
      
    })
   
}

const deleteJob=(req,res,err)=>{
        Job.findOneAndDelete({_id:req.params.jobid},(err)=>{
            if(err){
                res.json({error:err})
                return
            }
            res.sendStatus(200)
    
        })
    
}
const getJob=async(req,res,err)=>{
    console.log(req.params)
    const job=await Job.aggregate([
        {$match:{_id:mongoose.Types.ObjectId(req.params.jobid)}},
       
        {$project:{
            title:1,
            desc:1,
            requirements:1,
            experience:1,
            level:1,
            language:1,
            salary:1,
            type:1,
            open:1,
            quiz:1,
            created_date:1,
            positions:1,
            languages:1,
            quiz_time:1,
            lang_score:1,
            company:1,
            quiz_length:{$size:"$quiz"},
            applicantsNo:{$size:"$applicants"},
            rejected:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","rejected"]}
                }
            }},
            accepted:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","accepted"]}
                }
            }},
            oncontact:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","oncontact"]}
                }
            }},
            shortlisted:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","shortlisted"]}
                }
            }},
    
        }}
        

    ])
 
    console.log(err,job)
    if(job){
        await Job.populate(job, {
            path:"company",
        select:["image"],
        populate: {
            path: 'user',
            model: 'User',
            select:"name"
          } 
    
    });

        res.json(job[0])

    }else{
            res.sendStatus(404)
    }
 
 

}
const editJob=(req,res,err)=>{
   
    Job.findOneAndUpdate({_id:req.params.jobid},{
      ...req.body.data
    },{new:true},(err,job)=>{
        res.json({job})
    })
   
}
const getAllJobs=async(req,res,err)=>{
    const jobs=await Job.aggregate([
        {$project:{
            title:1,
            desc:1,
            requirements:1,
            experience:1,
            level:1,
            language:1,
            salary:1,
            created_date:1,
            type:1,
            positions:1,
            languages:1,
            lang_score:1,
            quiz_time:1,
            open:1,
            quiz_length:{$size:"$quiz"},
            company:1,
            applicantsNo:{$size:"$applicants"},
            rejected:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","rejected"]}
                }
            }},
            accepted:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","accepted"]}
                }
            }},
            oncontact:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","oncontact"]}
                }
            }},
            shortlisted:{$size:{
                $filter:{
                    input:'$applicants',
                    cond:{"$eq":["$$this.status","shortlisted"]}
                }
            }},
    
        }}

    ]).sort({_id:1})
        console.log(err,jobs)
        if(jobs){
            await Job.populate(jobs, {
                path:"company",
            select:["image"],
            populate: {
                path: 'user',
                model: 'User',
                select:"name"
              } 
        
        });
            res.json(jobs)

        }else{
            res.sendStatus(404)
        }
  
}
const addQuestion =async(req,res,err)=>{
    console.log("ADD QUESTION")
try{
        const company  = await Company_profile.findOne({user:req.user._id})
        
        if(!company){
            return res.json({error:"wrong access"})
        }
        console.log(req.body.data)
        const question_=req.body.data.question
        const job = await Job.findOneAndUpdate({$and:[{_id:req.params.jobid},{company:company._id}]},{$push:{"quiz":question_}},{new:true})
        
        res.json({job})
  
}catch(e){
    res.sendStatus(500)
}
       
}
const removeQuestion =async(req,res,err)=>{
    
        const company  = await Company_profile.findOne({user:req.user._id})
        if(!company){
            return res.json({error:"wrong access"})
        }
        console.log("JOB ID ",req.params.jobid)
        const job = await Job.findOneAndUpdate({$and:[{_id:req.params.jobid},{company:company._id}]},{$pull:{"quiz":{_id:req.params.questionid}}},{new:true})
        res.sendStatus(200)
       
    
         
}
const editQuestion =async(req,res,err)=>{
    try{

     const company  = await Company_profile.findOne({user:req.user._id})
     if(!company){
         return res.json({error:"wrong access"})
     }
     const job = await Job.findOneAndUpdate({$and:[{_id:req.params.jobid},{company:company._id},{"quiz._id":req.params.questionid}]},{$set:{"quiz.$":{...req.body.data.question,id:req.params.questionid}}},{new:true})
     res.json({job})
    }catch(err){
     return res.json({error:err})
 
    }   
}


module.exports={
    createJob,
    deleteJob,
    getJob,
    editJob,
    getAllJobs,
    addQuestion,
    removeQuestion,
    editQuestion

}
