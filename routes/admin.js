const Router = require("express").Router();
const {
    getWebSiteAnalysis,
    addVisitor,
    getAnalysis,
    getTests,
    login,
    sendNotification,
    websiteMode
} = require("../controller/admin/admin");
const adminPassport = require("../services/adminPassport");
const bcrypt = require("bcrypt");
const admin = require("../controller/admin/admin");

Router.get(
    "/website-analysis/",
    adminPassport.authenticate("jwt", { session: false }),
    getWebSiteAnalysis
);
Router.get(
    "/analysis/",
    adminPassport.authenticate("jwt", { session: false }),
    getAnalysis
);
Router.post(
    "/notification",
    adminPassport.authenticate("jwt", { session: false }),
    sendNotification
);
Router.post("/", login);

Router.post("/add-visitor/", addVisitor);
Router.post("/website-mode",websiteMode)
module.exports = Router;
