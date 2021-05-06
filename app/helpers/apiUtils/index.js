const config = require('../../config/index')
const { getSpikeTokenKartoffel } = require('../../helpers/spike');
const { ServerError } = require('../../helpers/errorHandler');
const axios = require('axios');
const https = require('https');
const request = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    timeout: 5000
});

const getPersonById = async (id) => {
    const token = await getSpikeTokenKartoffel();
    const headers = { Authorization: token };
    const url = `${config.kartoffelUrl}/api/persons/${encodeURI(id)}`;
    const searchResults = await request.get(url, { headers }).catch(err => {
        console.log(err.response.statusText);
        // const error = err.response;
        // throw new ServerError(error.status, error.data);
        throw new ServerError(500, 'failed contacting kartoffel');
    });
    return searchResults.data;
}

module.exports = { getPersonById }