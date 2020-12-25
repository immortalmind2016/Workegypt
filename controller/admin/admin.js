var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Job = mongoose.model("Job");
const User = mongoose.model("User");
const Company_profile = mongoose.model("Company_profile");
const Applicant_profile = mongoose.model("Applicant_profile");
const Notification = mongoose.model("Notification");

const Analysis = require("../../model/Analysis");
const passport = require("passport");
const config = require("../../config");
const Post = require("../../model/Post");

const Event = require("../../model/Event");
const sendNotification = async (req, res, err) => {
    //to 0 User , 1 Company , 2 all
    try {
        const { type, to, title, body } = req.body;
        let users = await User.find({ type: to }).lean();
        console.log(users);
        notifications = users.map((user) => {
            return {
                body,
                title,
                type,
                user: user._id,
                ...{
                    ...(type == "url"
                        ? { url: req.body.url }
                        : { job: req.body.jobId }),
                },
            };
        });
        await Notification.insertMany(notifications);
        return res.sendStatus(200);
    } catch (e) {
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

    const token = jwt.sign({ username, password }, "secret");
    res.json({ token: `Bearer ${token}` });
};
const get = (req, res, err) => {
    res.json({ username: config.username });
};
module.exports = {
    getWebSiteAnalysis,
    addVisitor,
    getAnalysis,
    getTests,
    login,
    get,
    sendNotification,
};
