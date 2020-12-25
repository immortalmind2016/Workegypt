const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notification = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        url: String,
        notificationType: String,
        job: {
            type: Schema.Types.ObjectId,
            ref: "Job",
        },
        title: String,
        to: Number,

        body: {
            type: String,
            default: "Check your notification",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Notification", Notification);
