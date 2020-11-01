 
module.exports = {
    env: process.env.NODE_ENV,
    dbOptions: { useUnifiedTopology: true , useNewUrlParser: true },
    dbUrl: process.env.DB_URL,
    dbUrlTest: process.env.DB_URL_TEST,
    redisUrl: process.env.REDIS_URL,
    spikeUrl: process.env.SPIKE_URL,
    kartoffelUrl: process.env.KARTOFFEL_URL,
    auth: false,
    isMock: false,
}