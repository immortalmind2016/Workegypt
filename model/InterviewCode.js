const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InterviewCode = new Schema(
    {
        code: String,
        endDate: Date,
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("InterviewCode", InterviewCode);
