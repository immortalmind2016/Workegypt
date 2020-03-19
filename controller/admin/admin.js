var jwt = require('jsonwebtoken');
const mongoose=require("mongoose")
const Job=mongoose.model("Job")
const User=mongoose.model("User")
const Company_profile=mongoose.model("Company_profile")
const Applicant_profile=mongoose.model("Applicant_profile")

const Analysis=require("../../model/Analysis")





const getWebSiteAnalysis=async(req,res,err)=>{
    Analysis.aggregate([
    

{ $project:
    {
      month: { $month: "$created_date" },

   


 
    },
    
},


{
    "$group": {
        "_id": "$month",
        count:{$sum: 1 }
      
       }
},

        
    ],async(err,analysis)=>{
        console.log(analysis)
      let total= await User.find({}).count()
       res.json({analysis:{per_month:analysis[0],total}})
    });
  
 }

 const getAnalysis=async(req,res,err)=>{
    console.log(req.params)
    
    const jobs=await Job.aggregate([
       
        {$project:{
          
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
    
        }},
        
        {
            $group : {
                _id : null,
                total:{$sum:1},
                shortlisted : {
                    $sum : "$shortlisted"
                },
                oncontact : {
                    $sum : "$oncontact"
                },
                accepted : {
                    $sum : "$accepted"
                },
                rejected : {
                    $sum : "$rejected"
                },
                applicantsNo : {
                    $sum : "$applicantsNo"
                },

            }
        }
        

    ])
let companies=await Company_profile.find({}).count()
let applicants=await Applicant_profile.find({}).count()

res.json({analysis:{jobs:jobs[0],companies,applicants}})
 
 
 
  
 }


const addVisitor=(req,res,err)=>{
    new Analysis({
        visitor:req.body.data.address,

    }).save(()=>{
        res.sendStatus(200)
    })
}
const getTests=(req,res,err)=>{
    
}
module.exports={
    getWebSiteAnalysis,
    addVisitor,
    getAnalysis,
    getTests
 

}
