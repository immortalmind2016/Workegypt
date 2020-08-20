var express = require('express')
var {url}=require("../../config")
const applicantUploadVideos=(req,res,err)=>{
    console.log("RESQUEEEEEEEEEEEEEST")
    const file = req.file
    console.log(file)
    if (!file) {
      const error = new Error('Please upload a file')
 
     return res.sendStatus(400)
    }
    res.json({link:`${url}/${file.destination.replace("public/","")}/${file.filename}`})
}
const applicantUploadCv=(req,res,err)=>{
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
 
     return res.sendStatus(400)
    }
    res.json({link:`${url}/${file.destination.replace("public/","")}/${file.filename}`})
}

const applicantUploadImages=(req,res,err)=>{
    const file = req.file
    
    if (!file) {
      const error = new Error('Please upload a file')
 
     return res.sendStatus(400)
    }
    res.json({link:`${url}/${file.destination.replace("public/","")}/${file.filename}`})
}
module.exports={
    applicantUploadVideos,
    applicantUploadImages,
    applicantUploadCv
}