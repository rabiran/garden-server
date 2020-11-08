
const axios = require('axios');
const https = require('https');
const config = require('../config');
const migrationsMock = require('../mocks/migrations');
const users = require('../mocks/users');
const domains = require('../mocks/domains');

const wait = require('../helpers/utils/wait');
const { getSpikeTokenG } = require('../helpers/spike');

const request = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    timeout: 5000
});

const getImmigrants = async (req, res) => {
    // proxy axios
    res.json(migrationsMock);
    // if(config.isMock) { await wait(200); res.json({data: migrationsMock}); }
}

const addImmigrant = async (req, res) => {
    // proxy axios
    res.send(200);
}

const deleteImmigrant = async (req, res) => {
    // proxy axios
    res.send(200);
}

const search = async (req, res) => {
    // proxy axios
    // if(config.isMock) { await wait(200); res.json({data: users}); }
}

const getDomains = async (req, res) => {
    // proxy axios
    // if(config.isMock) { await wait(200); res.json({data: users}); }
    if(config.isMock)
        res.json(domains);
}

module.exports = { getImmigrants, addImmigrant, deleteImmigrant, search, getDomains }