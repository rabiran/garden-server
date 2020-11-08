const passport = require("passport");
const { Strategy } = require("passport-shraga");
const config = require('../config/shraga');

// passport.serializeUser((user, cb) => {
//     //serialize function
// });

// passport.deserializeUser((id, cb) => {
//     ///deserialize function
// });

passport.use(new Strategy(config, (profile, done) => {
    console.log(profile);
    console.log(`My Profile Is: ${profile}`);
    done(null, profile);
}))