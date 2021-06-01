module.exports = {
    callbackURL: "http://localhost:3005/auth/callback",
    shragaURL: process.env.SHRAGA_URL,
    useEnrichId: false,
    transform: x => x
};