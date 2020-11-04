const passport = require("passport");
const { Strategy } = require("passport-shraga");

// passport.serializeUser((user, cb) => {
//     //serialize function
// });

// passport.deserializeUser((id, cb) => {
//     ///deserialize function
// });

const config = {
    callbackURL: "/auth/callback",
    shragaURL: "http://localhost:3000",
    useEnrichId: false,
    transform: x => x
};

passport.use(new Strategy(config, (profile, done) => {
    console.log(profile);
    console.log(`My Profile Is: ${profile}`);
    done(null, profile);
}))