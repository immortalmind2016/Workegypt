const Message = require("../model/Message");
const Conversation = require("../model/Conversation");
const mongoose = require("mongoose");
const axios = require("axios");
const { url } = require("../config.js");
const Applicant_profile = require("../model/Applicant_profile");
const Company_profile = require("../model/Company_profile");
let connectedPeers = new Map();

module.exports = (io) => {
    io.origins("*:*");
    io.on("connection", (socket) => {
        connectedPeers.set(socket.id, socket);

        console.log("NEW CLIENT");

        socket.on("CheckOnline", function ({ applicantId, companyId }) {
            console.log("APPLOICANT ID ", applicantId, companyId);

            let exist = io.sockets.adapter.rooms[applicantId];
            console.log(io.sockets.adapter.rooms[applicantId]);
            console.log(io.sockets.adapter.rooms[companyId]);

            if (exist) {
                console.log("EXIST");

                socket.emit("UserConnected", applicantId);
            } else {
            }
        });
        socket.on("NewClient", function ({ userid, type }) {
            socket.join(`user-type-${type ? 1 : 0}`, () => {
                console.log(`user-type-${type ? 1 : 0}`, userid, type);
            });
            socket.join(`user-type-2`, () => {
                console.log(`user-type-2`, userid, type);
            });
            socket.join(userid, () => {
                console.log("JOINED", userid, type);
            });

            /* if(type){
            //for this socketس
            this.to(userid).emit("CreatePeer",userid)
            }*/
        });
        socket.on("NewClientMobile", function ({ userid, type }) {
            let exist = io.sockets.adapter.rooms[userid];

            if (!exist) {
                socket.join(userid, () => {
                    console.log("JOINED", userid, type);
                });
            }

            /* if(type){
            //for this socketس
            this.to(userid).emit("CreatePeer",userid)
            }*/
        });

        //chat

        socket.on("message", async function ({ text, from, to, type }) {
            console.log(from, to);
            const to_ = to;
            from = mongoose.Types.ObjectId(from);
            to = mongoose.Types.ObjectId(to);
            console.log(from, to, "CONVERSATION");

            const conv = await Conversation.findOneAndUpdate(
                {
                    $or: [
                        { "info.applicant": from, "info.company": to },
                        { "info.applicant": to, "info.company": from },
                    ],
                },
                {
                    info: {
                        applicant: type ? to : from,
                        company: type ? from : to,
                    },
                },
                {
                    upsert: true,
                    new: true,
                    strict: false,
                }
            );

            new Message({
                conversation: conv._id,
                info: {
                    from,
                    to,
                },
                text,
            }).save(async (err, message) => {
                try {
                    const response = await axios.get(
                        `${url}api/chat/conversation/${conv._id}/${to}/${from}`
                    );
                    console.log(response.data, "RESPONSE");
                    const conversation = response.data;
                    if (conversation) {
                        socket.emit("NewMessage", {
                            message,
                            conversation: conversation.from[0],
                        });
                        this.to(to_).emit("NewMessage", {
                            message,
                            conversation: conversation.to[0],
                        });
                        const result = type
                            ? await Applicant_profile.findOne(
                                  { _id: to },
                                  "user"
                              ).populate("user", "pushNotificationToken")
                            : await Company_profile(
                                  { _id: from },
                                  "user"
                              ).populate("user", "pushNotificationToken");
                        let token = result
                            ? result.user.pushNotificationToken
                                ? result.user.pushNotificationToken
                                : null
                            : null;
                        if (token) {
                            pushMessage(
                                {
                                    sound: "default",
                                    body: "This is a test notification",
                                    data: { withSome: "data" },
                                },
                                [result.user.pushNotificationToken]
                            );
                        }
                    }
                } catch (e) {
                    console.log("ERROR ", e);
                }
            });
        });
        socket.on("seen", async ({ text, from, to, type }) => {
            await Conversation.findOneAndUpdate(
                {
                    $or: [
                        { applicant: from, company: to },
                        { applicant: to, company: from },
                    ],
                },
                {
                    updated: false,
                },
                {
                    new: true,
                }
            );
        });
    });

    function Disconnect() {
        // this.to(io.sockets.manager.roomClients[socket.id]).emit("AnotherClose")
    } /*
setInterval(()=>{
console.log(io.sockets.adapter.rooms["5e6d8b04a0c30528ff781965"])

},2000)*/
    function SendOffer({ offer, userId, applicantId }) {
        //send this offer to all other user
        console.log("SEND OFFER ", userId, applicantId);
        this.to(applicantId).emit("BackOffer", { offer, userId });
        this.to(userId).emit("BackOffer", { offer, userId });
    }
    function SendAnswer({ answer, userId, applicantId }) {
        //send answer to company
        console.log("SEND ANSWER", userId, applicantId);
        this.to(userId).emit("BackAnswer", { answer, userId });
        this.to(applicantId).emit("BackAnswer", { answer, userId });
    }
};

// mobile socket
