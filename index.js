const mongoose=require('mongoose')
mongoose.connect("mongodb://immortalmind:0115120323a@ds036967.mlab.com:36967/test1",{ useUnifiedTopology: true ,useNewUrlParser:true} )
const express=require("express");
const bodyParser=require("body-parser")
const app=express()

const passport=require("./services/jwtPassport")

const user=require("./routes/user")
const profile=require("./routes/profile")

app.use(express.static("public"))

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));


app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:5000', 'http://127.0.0.1:3000',"http://localhost:3000"];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //      res.setHeader("Access-Control-Allow-Origin", "*");
          //res.setHeader("Access-Control-Allow-Origin", "");

         res.setHeader("Access-Control-Allow-Methods", "POST, GET,DELETE,PUT,OPTIONS");
         res.setHeader("Access-Control-Max-Age", "3600");
         res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   
       next();
     });

app.use("/api/user/",user)

app.use("/api/profile/",profile)

const PORT=5000
app.listen(PORT,()=>{
 console.log(`listining on port number ${PORT}`)
})