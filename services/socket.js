
const Message = require("../model/Message")
const Conversation = require("../model/Conversation")
const mongoose=require("mongoose")
module.exports = (io) => {

    io.origins('*:*')
    io.on("connection", (socket) => {
        console.log("NEW CLIENT")
        socket.on("cancel", function ({ applicantId }) {
            this.to(applicantId).emit("cancel")


        })
        socket.on("reject", function ({ companyId }) {
            console.log("REJECTED ", companyId)
            this.to(companyId).emit("rejected", ({ companyId }))

        })
        socket.on("accept", function ({ companyId }) {
            this.to(companyId).emit("accepted", ({ companyId }))

        })
        socket.on("CallUser", function ({ applicantId, companyId, companyName, companyImg }) {
            this.to(applicantId).emit("ReceiveCall", ({ companyId, companyName, companyImg }))
            console.log("CALL USER ", applicantId, companyName, companyImg)
        })


        
        socket.on("CheckOnline", function ({ applicantId, companyId }) {
            console.log("APPLOICANT ID ", applicantId, companyId)


            let exist = io.sockets.adapter.rooms[applicantId]
            console.log(io.sockets.adapter.rooms[applicantId])
            console.log(io.sockets.adapter.rooms[companyId])

            if (exist) {
                console.log("EXIST")

                socket.emit("UserConnected", applicantId)

            } else {

            }


        })
        socket.on("NewClient", function ({ userid, type }) {
            socket.join(userid, () => {

                console.log("JOINED", userid, type)
            })

            /* if(type){
            //for this socketس
            this.to(userid).emit("CreatePeer",userid)
            }*/


        })
        //company start to create peer
        socket.on("CreatePeer", function ({ userId, applicantId }) {
            console.log("creatPeer", userId, applicantId)
            this.to(userId).emit("CreatePeer", applicantId)
            this.to(applicantId).emit("CreatePeer", userId)

        })
        socket.on("Offer", SendOffer)
        socket.on("Answer", SendAnswer)
        socket.on("disconnect", Disconnect)

        //chat

        socket.on("message", async ({ text, from, to, type }) => {
            console.log(from,to)
            from=mongoose.Types.ObjectId(from)
            to=mongoose.Types.ObjectId(to)
            const conv = await Conversation.findOneAndUpdate({ $or: [{ applicant:  from, company: to }, { applicant: to, company: from }] }, {
                info: {

                    applicant: type ? to : from,
                    company: type ? from : to,

                },
                text

            },
                {
                    upsert: true,
                    new: true,
                  strict:false
             
                })
            new Message({
                conversation:conv._id,
                info: {

                    from,
                    to,
                    
              

                },
            }).save((err,message)=>{
                socket.emit("NewMessage",message)

            })


        })
        socket.on("seen", async ({ text, from, to, type }) => {
             await Conversation.findOneAndUpdate({ $or: [{ applicant: from, company: to }, { applicant: to, company: from }] }, {
                updated:false
            },
                {
                   
                    new: true,
                    
                })

        })



    })


    function Disconnect() {
     
        // this.to(io.sockets.manager.roomClients[socket.id]).emit("AnotherClose")
    }/*
setInterval(()=>{
console.log(io.sockets.adapter.rooms["5e6d8b04a0c30528ff781965"])

},2000)*/
    function SendOffer({ offer, userId, applicantId }) {
        //send this offer to all other user
        console.log("SEND OFFER ", userId, applicantId)
        this.to(applicantId).emit("BackOffer", { offer, userId })
        this.to(userId).emit("BackOffer", { offer, userId })

    }
    function SendAnswer({ answer, userId, applicantId }) {
        //send answer to company
        console.log("SEND ANSWER", userId, applicantId)
        this.to(userId).emit("BackAnswer", { answer, userId })
        this.to(applicantId).emit("BackAnswer", { answer, userId })

    }
}