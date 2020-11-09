const getTokenCreator = require("spike-get-token");
const goptions = require('../config/gToken');
const kartoffelOptions = require('../config/kartoffelToken');

let getTokenG;
let getTokenKartoffel;

const configureSpikeRedis = () => {
    getTokenG = getTokenCreator(goptions);
    getTokenKartoffel = getTokenCreator(kartoffelOptions);
}

const getSpikeTokenG = async () => {
    return await getTokenG();
}

const getSpikeTokenKartoffel = async () => {
    return await getTokenKartoffel();
}

module.exports = { configureSpikeRedis , getSpikeTokenG, getSpikeTokenKartoffel }