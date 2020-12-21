const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema(
    {
        code: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", Post);
