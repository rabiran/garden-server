const getTokenCreator = require("spike-get-token");
const goptions = require('../config/gToken');

let getTokenG;

const configureSpikeRedisG = () => {
    getTokenG = getTokenCreator(goptions);
}

const getSpikeTokenG = async () => {
    return await getTokenG();
}

module.exports = { configureSpikeRedisG , getSpikeTokenG }