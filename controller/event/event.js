const Event=require("../../model/Event")
const {url} = require("../../config");
const uploadEvent=(req,res,err)=>{
    new Event({
        ...req.body.data
    }).save((err,event)=>{
        if(err){
            return res.status(500).json({error:err})
        }
        res.json({event})
    })
}
const editEvent=(req,res,err)=>{
    try{
        Event.findOneAndUpdate({_id:req.params.id},{...req.body.data},{new:true},(err,event)=>{
            res.json({event})
        })
    }catch(e){
        return res.status(500).json({error:e})
    }
}
const deleteEvent=(req,res,err)=>{
    try{
        Event.findOneAndDelete({_id:req.params.id},(err)=>{
            res.sendStatus(200)
        })
    }catch(e){
        return res.status(500).json({error:e})
    }

}

const getEvent=(req,res,err)=>{
    try{
        Event.findOne({_id:req.body.data.id},(err,event)=>{
            res.json({event})
        })
    }catch(e){
        return res.status(500).json({error:e})
    }
 
}
const getEvents=(req,res,err)=>{
  
    try{
        Event.find({},(err,events)=>{
            res.json({events})
        }).limit(50)
    
    }catch(e){
        return res.status(500).json({error:e})
    }
}
const getMoreEvents=(req,res,err)=>{
   
    try{
        Event.find({},(err,events)=>{
            res.json({events})
        }).skip(Number.parseInt(req.params.skip)).limit(5)
    
    }catch(e){
        return res.status(500).json({error:e})
    }
}

const going=(req,res,err)=>{
   
    try{
        Event.updateOne({_id:req.body.data.id},{$inc:{"going_counter":1}},(err,event)=>{
            res.json({event})
        })
    
    }catch(e){
        return res.status(500).json({error:e})
    }
}

module.exports={
    uploadEvent,editEvent,deleteEvent,going,getEvent,getEvents,getMoreEvents

}
