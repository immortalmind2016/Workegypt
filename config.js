module.exports = {
    //url:"http://www.workegypt.net/",
    url: "http://http://157.230.235.39/",
    username: "admin",
    notifications: {
        applyForJob: {
            title: "Applicant applied",
            body: (title, name) =>
                `New Application on ${title} job from user ${name}`,
        },
        editApplicantStatus: {
            title: "Job title ",
            body: "job status ",
        },
        cancelJob: {
            title: "Application cancelled",
            body: (title, name) =>
                `Job Application ${title} was cancelled from user ${name}`,
        },
    },
};
