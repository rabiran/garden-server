module.exports = {
    callbackURL: "/auth/callback",
    shragaURL: process.env.SHRAGA_URL,
    useEnrichId: false,
    transform: x => x
};