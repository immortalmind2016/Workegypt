var express = require('express')
var {url}=require("../../config")

const companyUploadImages=(req,res,err)=>{
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
 FIOLEEEEE
     return res.sendStatus(400)
    }
    res.json({link:`${url}/${file.destination.replace("public/","")}/${file.filename}`})
}
const companyUploadVideos=(req,res,err)=>{
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')

     return res.sendStatus(400)
    }
    console.log("FIOLEEEEE ",file)
    res.json({link:`${req.file.location}`})
}
module.exports={
    companyUploadVideos,
    companyUploadImages
}