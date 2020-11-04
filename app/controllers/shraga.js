
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
        const payload = await averify(token, config.jwtSecret);
        return next();
    }   
    catch(err) {
        return res.redirect('/shraga');
    }
}

const shragaCallback = async (req, res) => {
    const { id , displayName } = req.user;
    const allowedUser = await dbGetAllowedById(id);
    if(!allowedUser) {
        return res.redirect('/unauthorized')
    }

    const token = jwt.sign({
        fullName: displayName,
        isAdmin: allowedUser.isAdmin
    },config.jwtSecret, { expiresIn: "1h"});

    res.cookie('MSGardenToken', token);
    res.redirect('/');
    // res.send(token);
}

const getAuth = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];
    const payload = await averify(token, config.jwtSecret).catch(err => {
        throw new ServerError(401, 'that shouldnt happen');
    });
    res.json(payload);
}

module.exports = { checkAuth, shragaCallback, getAuth }