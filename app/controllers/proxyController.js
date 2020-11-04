
const axios = require('axios');
const config = require('../config');
const migrationsMock = require('../mocks/migrations');
const users = require('../mocks/users');

const wait = require('../helpers/utils/wait');

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

module.exports = { getImmigrants, addImmigrant, deleteImmigrant, search }