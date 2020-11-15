const config = require('./index');
const path = require("path");

module.exports = {
    redisHost: config.redisUrl,
    ClientId: process.env.SPIKE_CLIENT_ID_G,
    ClientSecret: process.env.SPIKE_CLIENT_SECRET_G,
    spikeURL: config.spikeUrl,
    tokenGrantType: 'client_credentials',
    tokenAudience: process.env.AUDIENCE_G,
    tokenRedisKeyName: 'gtoken',
    spikePublicKeyFullPath: path.join(__dirname, './key.pem'),
    useRedis: true,
    httpsValidation: false,
}