
const jwt = require('jsonwebtoken');
const util = require('util');
const { ServerError } = require('../helpers/errorHandler');
const config = require('../config');
const { dbGetAllowedById } = require('../repository');

const averify = util.promisify(jwt.verify);

const checkAuth = async (req, res, next) => {
    //const token = req.header('Authorization');
    const token = req.cookies['MSGardenToken'];

    try {
        await averify(token, config.jwtSecret);
        return next();
    }   
    catch(err) {
        return res.redirect('/shraga');
    }
}

const shragaCallback = async (req, res) => {
    const { id , displayName, genesisId, name } = req.user;

    const actualId = genesisId || id;
    const allowedUser = await dbGetAllowedById(actualId);
    if(!allowedUser) {
        return res.redirect('/unauthorized')
    }

    const token = jwt.sign({
        id: actualId,
        fullName: `${name.firstName} ${name.lastName}`,
        isAdmin: allowedUser.isAdmin
    },config.jwtSecret, { expiresIn: config.tokenDuration});

    res.cookie('MSGardenToken', token);
    res.redirect('/');
    // res.send(token);
}

const getAuth = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];
    const payload = await averify(token, config.jwtSecret).catch(err => {
        throw new ServerError(401, 'no');
    });
    res.json(payload);
}

module.exports = { checkAuth, shragaCallback, getAuth }