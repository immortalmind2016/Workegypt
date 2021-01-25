var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Job = mongoose.model("Job");
const User = mongoose.model("User");
const Company_profile = mongoose.model("Company_profile");
const Applicant_profile = mongoose.model("Applicant_profile");
const Notification = mongoose.model("Notification");
var fs = require('fs');

const Analysis = require("../../model/Analysis");
const passport = require("passport");
const config = require("../../config");
const Post = require("../../model/Post");
const cuid = require("cuid");
const Event = require("../../model/Event");
const { broadCastNotification } = require("../../services/notifications");
const { sendPushNotification } = require("../../services/fcm");
const sendNotification = async (req, res, err) => {
    //to 0 User , 1 Company , 2 all
    try {
        const { type, to, title, body, push } = req.body;

            sendPushNotification({
                "notification": {
                    title,
                    body
                  },
                  "data":{
                      type
                  }
            }, to)
                .then((response) => {
                    // Response is a message ID string.
                    console.log(
                        "sendPushNotification/ Successfully sent message:",
                        response
                    );
                })
                .catch((error) => {
                    console.log(
                        "sendPushNotification/ Error sending message:",
                        error
                    );
                });
           
    
        let users = await User.find({
            ...{ ...(type == 0 && { type }) },
            ...{ ...(type == 1 && { type }) },
        }).lean();

        let notificationId = cuid();
        notifications = users.map((user) => {
            return {
                body,
                title,
                notificationType: type,
                notificationId,
                to,
                user: user._id,
                ...{
                    ...(type == "url" && { url: req.body.url }),
                },
                ...{
                    ...(type == "job" && { job: req.body.jobId }),
                },
            };
        });
        const nots = await Notification.insertMany(notifications);
        //sendPushNotification.then((response) => {
        //     // Response is a message ID string.
        //     console.log("Successfully sent message:", response);
        // })
        // .catch((error) => {
        //     console.log("Error sending message:", error);
        // });
        broadCastNotification({
            body,
            title,
            notificationType: type,
            notificationId,
            to,
            ...{
                ...(type == "url"
                    ? { url: req.body.url }
                    : { job: req.body.jobId }),
            },
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.status(501).json({ error: e.message });
    }
};

const getWebSiteAnalysis = async (req, res, err) => {
    User.aggregate(
        [
            {
                $project: {
                    month: { $month: "$created_date" },
                },
            },

            {
                $group: {
                    _id: "$month",
                    count: { $sum: 1 },
                },
            },
        ],
        async (err, analysis) => {
            console.log(analysis);
            let total = await User.find({}).count();
            res.json({ analysis: { per_month: analysis, views: 0, total } });
        }
    );
};

const getAnalysis = async (req, res, err) => {
    console.log(req.params);

    const jobs = await Job.aggregate([
        {
            $project: {
                applicantsNo: { $size: "$applicants" },

                rejected: {
                    $size: {
                        $filter: {
                            input: "$applicants",
                            cond: { $eq: ["$$this.status", "rejected"] },
                        },
                    },
                },
                accepted: {
                    $size: {
                        $filter: {
                            input: "$applicants",
                            cond: { $eq: ["$$this.status", "accepted"] },
                        },
                    },
                },
                oncontact: {
                    $size: {
                        $filter: {
                            input: "$applicants",
                            cond: { $eq: ["$$this.status", "oncontact"] },
                        },
                    },
                },
                shortlisted: {
                    $size: {
                        $filter: {
                            input: "$applicants",
                            cond: { $eq: ["$$this.status", "shortlisted"] },
                        },
                    },
                },
            },
        },

        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                shortlisted: {
                    $sum: "$shortlisted",
                },
                oncontact: {
                    $sum: "$oncontact",
                },
                accepted: {
                    $sum: "$accepted",
                },
                rejected: {
                    $sum: "$rejected",
                },
                applicantsNo: {
                    $sum: "$applicantsNo",
                },
            },
        },
    ]);

    let companies = Company_profile.find({}).count();
    let applicants = Applicant_profile.find({}).count();
    let posts = Post.find({}).count();
    let events = Event.find({}).count();

    companies = await companies;
    applicants = await applicants;
    posts = await posts;
    events = await events;

    res.json({
        analysis: { jobs: jobs[0], companies, applicants, posts, events },
    });
};

const addVisitor = (req, res, err) => {
    new Analysis({
        visitor: req.body.data.address,
    }).save(() => {
        res.sendStatus(200);
    });
};
const getTests = (req, res, err) => {};
const login = (req, res, err) => {
    const { username, password } = req.body.data;
    if (username != process.env.USER_NAME || password != process.env.PASSWORD)
        return res.status(401).json({ error: "Wrong user !" });
    const token = jwt.sign({ username, password }, "secret");
    res.json({ token: `Bearer ${token}` });
};
const get = (req, res, err) => {
    res.json({ username: config.username });
};
const path=require('path')
const websiteMode=async (req,res,err)=>{
    await fs.writeFileSync( path.resolve(__dirname,"..","..","admin.json"),`{"websiteMode":"${req.body.mode}"}`,"utf8")
    res.json({success:true})
}

module.exports = {
    getWebSiteAnalysis,
    addVisitor,
    getAnalysis,
    getTests,
    login,
    get,
websiteMode,
    sendNotification,
};
