var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport").Passport;
let pass = new passport();

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const adminPassword = process.env.PASSWORD;

let hashedAdminPassword = "";
bcrypt.hash(adminPassword, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    hashedAdminPassword = hash;
});

module.exports = pass.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        console.log(jwt_payload);
        console.log("LOGIN ADMIN")
        bcrypt.compare(
            jwt_payload.password,
            hashedAdminPassword,
            function (err, result) {
                if (result) {
                    return done(null, jwt_payload);
                } else {
                    return done(null, false);
                }
            }
        );
    })
);
