const mongoose = require('mongoose')


//mongoose.connect("mongodb://immortalmind:0115120323a@ds036967.mlab.com:36967/test1", { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connect("mongodb+srv://mohammed:1112@vidjot-pgfzx.mongodb.net/workEg?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })

//
const express = require("express");
const bodyParser = require("body-parser")
const app = express()
app.use(express.static("public"))
const path = require("path")
const passport = require("./services/jwtPassport")
require('dotenv').config()

const user = require("./routes/user")
const profile = require("./routes/profile")
const job = require("./routes/job")
const company = require("./routes/company")
const payment = require("./routes/payment")
const applicant = require("./routes/applicant")
const admin = require("./routes/admin")
const post = require("./routes/post")
const event = require("./routes/event")
const chat = require("./routes/chat")
require("./init")
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const http=require("http").Server(app)
const io=require("socket.io")(http,{
    secure:true,

reconnect: true,

rejectUnauthorized : false

})

io.origins('*:*') 

require("./services/socket")(io)
app.use(function (req, res, next) {
     var allowedOrigins = ["https://8fib4t1ccaof.loclx.io","https://25.24.10.197:3000/","https://25.24.10.197:3000","http://7oltshuotddi.loclx.io","http://cb6ac17b.ngrok.io","http://ae435531.ngrok.io",'http://localhost:5000',"http://4a011676.ngrok.io/", "http://93f52e7f.ngrok.io", 'http://5d845a7f.ngrok.io', "http://490ea9cb.ngrok.io", 'http://127.0.0.1:3000',"http://localhost:3001", "http://localhost:3000", "http://5945f4bd.ngrok.io", "http://42249189.ngrok.io","http://localhost:3001"];
     var origin = req.headers.origin;
     if (allowedOrigins.indexOf(origin) > -1) {
          //res.setHeader('Access-Control-Allow-Origin', origin);
          res.header("Access-Control-Allow-Origin", "*");

     }
     //      res.setHeader("Access-Control-Allow-Origin", "*");
     //res.setHeader("Access-Control-Allow-Origin", "");

     res.setHeader("Access-Control-Allow-Methods", "POST, GET,DELETE,PUT,OPTIONS");
     res.setHeader("Access-Control-Max-Age", "3600");
     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

     next();
});
app.use("/privacy", (req, res, err) => {
     res.download("./Policies.pdf")
})
app.use("/api/user/", user)

app.use("/api/profile/", profile)

app.use("/api/job/", job)

app.use("/api/company/", company)
app.use("/api/applicant/", applicant)

app.use("/api/payment/", payment)
app.use("/api/admin/", admin)

app.use("/api/post/", post)
app.use("/api/event/", event)
app.use("/api/chat/", chat)

app.use("/*",(req,res,err)=>{
     res.sendFile(__dirname+"/public/index.html")
   })
console.log("TEST")
const PORT = process.env.PORT||9000
http.listen(PORT, () => {
     console.log(`listining on port number ${PORT}`)
})

