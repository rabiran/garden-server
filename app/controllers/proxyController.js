
const axios = require('axios');
const https = require('https');
const config = require('../config');
const migrationsMock = require('../mocks/migrations');
const migrationMock = require('../mocks/migration');
const users = require('../mocks/users');
const domains = require('../mocks/domains');
const { ServerError } = require('../helpers/errorHandler');
const wait = require('../helpers/utils/wait');
const minify = require('../helpers/utils/migrationMinifiy');
const { getSpikeTokenG } = require('../helpers/spike');
const { getSpikeTokenKartoffel } = require('../helpers/spike');

const request = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    timeout: 5000
});



const getImmigrants = async (req, res) => {
    if(config.isMock)
        return res.json(migrationsMock);
    
    const { payload } = res.locals;
    const gardenerId = payload.id;
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/immigrant`;
    const migrations = await request.get(url, { headers }).catch(err => {
        const error = err.response;
        throw new ServerError(error.status, error.data);
    });
    const minifiedMigrations = migrations.data.map(migration => minify(migration));
    return res.json(minifiedMigrations);
}

const addImmigrant = async (req, res) => {
    if(config.isMock)
        return res.send(migrationMock);

    const { id, primaryUniqueId, isNewUser , startDate} = req.body;
    const { payload } = res.locals;
    const gardenerId = payload.id;
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/immigrant`;
    const migration = await axios.post(url,  {
        id,
        primaryUniqueId,
        isNewUser,
        startDate,
    }, { headers }).catch(err => {
        const error = err.response;
        throw new ServerError(error.status, error.data);
    });
    const minifiedMigration = minify(migration.data)
    return res.json(minifiedMigration);
}

const deleteImmigrant = async (req, res) => {
    if(config.isMock)
        return res.send('ok');

    const { id } = req.body;
    const { payload } = res.locals;
    const gardenerId = payload.id;
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/immigrant/${id}`;
    await request.delete(url, { headers }).catch(err => {
        const error = err.response;
        throw new ServerError(error.status, error.data);
    });
    res.send('ok');
}

const search = async (req, res) => {
    const { username } = req.params;
    const token = await getSpikeTokenKartoffel();
    const headers = { Authorization: token };
    const url = `${config.kartoffelUrl}/api/persons/search?fullName=${encodeURI(username)}`;
    const searchResults = await request.get(url, { headers }).catch(err => {
        const error = err.response;
        throw new ServerError(error.status, error.data);
    });
    return res.json(searchResults.data);
}
const searchOG = async (req, res) => {
    const { groupname } = req.params;
    const token = await getSpikeTokenKartoffel();
    const headers = { Authorization: token };
    const url = `${config.kartoffelUrl}/api/organizationGroups/search?name=${encodeURI(groupname)}`;
    const searchResults = await request.get(url, { headers }).catch(err => {
        const error = err.response;
        throw new ServerError(error.status, error.data);
    });
    return res.json(searchResults.data);
}
const getMembers = async (req, res) => {
    const { groupid } = req.params;
    const token = await getSpikeTokenKartoffel();
    const headers = { Authorization: token };
    const url = `${config.kartoffelUrl}/api/organizationGroups/${groupid}/members`;
    const searchResults = await request.get(url, { headers }).catch(err => {
        const error = err.response;
        throw new ServerError(error.status, error.data);
    });
    return res.json(searchResults.data);
}

const getExcel = async (req,res) =>{
    const token = await getSpikeTokenG();
    const headers = {Authorization: token};
    const url = `${config.gUrl}/api/excel`;
    const excelData = await request.get(url, {headers}).catch(err => {
        const error = err.response;
        throw new ServerError(error.status,error.data);
    });
    return res.json(excelData.data);
}

const getEntityType = async (req,res) =>{
    const token = await getSpikeTokenG();
    const headers = {Authorization: token};
    const url = `${config.gUrl}/api/entityType`;
    const entityType = await request.get(url, {headers}).catch(err => {
        const error = err.response;
        throw new ServerError(error.status,error.data);
    });
    return res.json(entityType.data);
}
const getDomainsMap = async (req,res) =>{
    const token = await getSpikeTokenG();
    const headers = {Authorization: token};
    const url = `${config.gUrl}/api/domainsMap`;
    const domainsMap = await request.get(url, {headers}).catch(err => {
        const error = err.response;
        throw new ServerError(error.status,error.data);
    });
    return res.json(domainsMap.data);
}

const getDomains = async (req, res) => {
    if(config.isMock)
        res.json(domains);

    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/domains`;
    const domains = await request.get(url, { headers }).catch(err => {
        const error = err.response;
        throw new ServerError(error.status, error.data);
    });
    return res.send(domains.data);
}

module.exports = { getImmigrants, addImmigrant, deleteImmigrant, search, getDomains,getExcel,searchOG , getMembers ,getEntityType, getDomainsMap}