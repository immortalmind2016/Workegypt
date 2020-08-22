
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
passport=require("passport")
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


const bcrypt = require('bcrypt');
const saltRounds = 10;
const adminPassword = '12345';

let hashedAdminPassword=""
bcrypt.hash(adminPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    hashedAdminPassword=hash
});

module.exports=passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload)

    bcrypt.compare(jwt_payload.password, hashedAdminPassword, function(err, result) {
        if(result){

            
        return done(null, jwt_payload);

        }else{
            return done(null, false);
        }


    });
  


}));

