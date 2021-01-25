const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const User = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    confirmation_token: {
        type: String,
    },
    salt:String,
    confirmed: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now(),
    },

    last_logout: {
        type: Date,
        default: null,
    },
    type: Boolean,
    new: {
        type: Boolean,
        default: true,
    },
    payment: {
        type: Object,
    },
    FCM_token: {
        type: String,
    },
});

User.pre("save", async function (next) {
    console.log("PRE SAVE password",this.isModified("password"))
    try {
   
      this.salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, this.salt);
    } catch (e) {
      next(e);
    }
    //}
    next();
  });
  User.methods.checkPassword = async function (textPassword) {
    //.methods called on instance
    console.log("PASSWORD", this.password);
    const hashed = await bcrypt.hash(textPassword, this.salt);
    console.log("SALT", this.salt);
    console.log("Hashed", hashed);
    return hashed == this.password;
  };
module.exports = mongoose.model("User", User);
