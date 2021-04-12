
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
const { id } = require('../mocks/migration');

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
    //const gardenerId = payload.id;
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/immigrant`;
    const migrations = await request.get(url, { headers }).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status, error.data);
        throw new ServerError(500, 'failed contacting g');
    });
    // const minifiedMigrations = migrations.data.map(migration => minify(migration));
    return res.json(migrations.data);
}

const addImmigrant = async (req, res) => {
    if(config.isMock)
        return res.send(migrationMock);

    const { id, primaryUniqueId, isNewUser , startDate, isUrgent} = req.body;
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
        gardenerId,
        isUrgent
    }, { headers }).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status, error.data);
        throw new ServerError(500, 'failed contacting g');
    });
    // const minifiedMigration = minify(migration.data)
    return res.json(migration.data);
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
        // const error = err.response;
        // throw new ServerError(error.status, error.data);
        throw new ServerError(500, 'failed contacting g');
    });
    res.send('ok');
}

const updateImmigrant = async(req, res) => {
    if(config.isMock)
        return res.send('ok');

    // const { viewed } = req.body;
    const { id } = req.params;
    const { payload } = res.locals;
    const gardenerId = payload.id;
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/immigrant/${id}`;
    const migration = await axios.put(url,  
        req.body
    , { headers }).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status, error.data);
        throw new ServerError(500, 'failed contacting g');
    });
    return res.send('ok');
}
const search = async (req, res) => {
    const { username } = req.params;
    const token = await getSpikeTokenKartoffel();
    const headers = { Authorization: token };
    const url = `${config.kartoffelUrl}/api/persons/search?fullName=${encodeURI(username)}`;
    const searchResults = await request.get(url, { headers }).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status, error.data);
        throw new ServerError(500, 'failed contacting kartoffel');
    });
    return res.json(searchResults.data);
}


const searchOG = async (req, res) => {
    const { groupname } = req.params;
    const token = await getSpikeTokenKartoffel();
    const headers = { Authorization: token };
    const url = `${config.kartoffelUrl}/api/organizationGroups/search?name=${encodeURI(groupname)}`;
    const searchResults = await request.get(url, { headers }).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status, error.data);
        throw new ServerError(500, 'failed contacting kartoffel');
    });
    return res.json(searchResults.data);
}
const getMembers = async (req, res) => {
    const { groupid } = req.params;
    const token = await getSpikeTokenKartoffel();
    const headers = { Authorization: token };
    const url = `${config.kartoffelUrl}/api/organizationGroups/${groupid}/members`;
    const searchResults = await request.get(url, { headers }).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status, error.data);
        throw new ServerError(500, 'failed contacting kartoffel');
    });
    return res.json(searchResults.data);
}

const getExcel = async (req,res) =>{
    const token = await getSpikeTokenG();
    const headers = {Authorization: token};
    const url = `${config.gUrl}/api/excel`;
    const excelData = await request.get(url, {headers}).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status,error.data);
        throw new ServerError(500, 'failed contacting g');
    });
    return res.json(excelData.data);
}

const getEntityType = async (req,res) =>{
    const token = await getSpikeTokenG();
    const headers = {Authorization: token};
    const url = `${config.gUrl}/api/entityType`;
    const entityType = await request.get(url, {headers}).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status,error.data);
        throw new ServerError(500, 'failed contacting g');
    });
    return res.json(entityType.data);
}
const getDomainsMap = async (req,res) =>{
    const token = await getSpikeTokenG();
    const headers = {Authorization: token};
    const url = `${config.gUrl}/api/domainsMap`;
    const domainsMap = await request.get(url, {headers}).catch(err => {
        // const error = err.response;
        // throw new ServerError(error.status,error.data);
        throw new ServerError(500, 'failed contacting g');
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
        // const error = err.response;
        // throw new ServerError(error.status,error.data);
        throw new ServerError(500, 'failed contacting g');
    });
    return res.send(domains.data);
}

const getCompletedStats = async (req, res) => {
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/stats/completed`;
    const stats = await request.get(url, { headers }).catch(err => {
        throw new ServerError(500, 'failed contacting g');
    });
    return res.send(stats.data);
}

const getGardenerStats = async (req, res) => {
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/stats/gardeners`;
    const stats = await request.get(url, { headers }).catch(err => {
        throw new ServerError(500, 'failed contacting g');
    });
    return res.send(stats.data);
}

const getTotalStats = async (req, res) => {
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/stats/total`;
    const stats = await request.get(url, { headers }).catch(err => {
        throw new ServerError(500, 'failed contacting g');
    });
    return res.send(stats.data);
}

const getProgressStats = async (req, res) => {
    const token = await getSpikeTokenG();
    const headers = { Authorization: token };
    const url = `${config.gUrl}/api/stats/statuses`;
    const stats = await request.get(url, { headers }).catch(err => {
        throw new ServerError(500, 'failed contacting g');
    });
    return res.send(stats.data);
}

module.exports = { getImmigrants, addImmigrant, deleteImmigrant, search, getDomains,getExcel,searchOG ,
     getMembers ,getEntityType, getDomainsMap, updateImmigrant,
     getCompletedStats, getGardenerStats, getTotalStats, getProgressStats
    }