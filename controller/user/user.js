var jwt = require('jsonwebtoken');
const User=require("../../model/user")
const Applicant_profile=require("../../model/Applicant_profile")
const Company_profile=require("../../model/Company_profile")


const signupUser=(req,res,err)=>{
    const {email,password,name,type}=req.body.data
    let newUser=new User({
        email,
        password,
        name,
        type

    })
    
    newUser.save((err,user)=>{
        if(!err){
      
        if(type==0){
            new Applicant_profile({
                    user:user._id
            }).save(err,profile=>{
                res.sendStatus(200)
            })
        }
        else if(type==1){
            new Company_profile({
                user:user._id
            }).save(err,profile=>{
                res.sendStatus(200)
            })
        }
        
        }else{
            res.sendStatus(303)
        }
    })
  
}

const signinUser=(req,res,err)=>{
    const  {email,password}=req.body.data;
    console.log(req.body.data)
    User.findOne({email,password},(err,user)=>{
        console.log(email)
        console.log(user)
        if(user){

            let token= jwt.sign({...user},"secret",{ expiresIn: '365d' })
            res.json({token,name:user.name,type:user.type})
        }else{
            res.sendStatus(404)
        }
     
    })
    
}
const getUser=(req,res,err)=>{
    console.log(req.user)
    if(req.user.type==0)
    Applicant_profile.findOne({user:req.user._id},(err,profile)=>{
        if(profile){
            res.json(profile)

        }else{
            res.sendStatus(404)
        }
    }).populate("user")
    else if(req.user.type==1){
        Company_profile.findOne({user:req.user._id},(err,profile)=>{
            if(profile){
                res.json(profile)
    
            }else{
                res.sendStatus(404)
            }
        }).populate("user")
    }

}
const editUser=(req,res,err)=>{
 
    User.findOneAndUpdate({email,password},{...req.body.data},{new:true},(err,user)=>{
        res.sendStatus(200)
    })
   
}

module.exports={
    signinUser,
    signupUser,
    editUser,
    getUser
}
