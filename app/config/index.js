const booleanEnvParser = require('../helpers/utils/booleanEnvParser');

module.exports = {
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    dbOptions: { useUnifiedTopology: true , useNewUrlParser: true },
    dbUrl: process.env.DB_URL,
    dbUrlTest: process.env.DB_URL_TEST,
    redisUrl: process.env.REDIS_URL,
    spikeUrl: process.env.SPIKE_URL,
    kartoffelUrl: process.env.KARTOFFEL_URL,
    gUrl: process.env.G_URL,
    secretMegaPassage: process.env.SUPER_SECRET,
    isAuth: booleanEnvParser(process.env.IS_AUTH),
    isMock: booleanEnvParser(process.env.IS_MOCK),
    jwtCookieName: "MSGardenToken",
    tokenDuration: "1h"
}