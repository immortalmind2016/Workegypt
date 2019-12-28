var express = require('express')
const applicantUploadVideos=(req,res,err)=>{
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
 
     return res.sendStatus(400)
    }
    res.send(file)
}
const applicantUploadImages=(req,res,err)=>{
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
 
     return res.sendStatus(400)
    }
    res.send(file)
}
module.exports={
    applicantUploadVideos,
    applicantUploadImages
}