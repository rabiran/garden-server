
const { ServerError } = require('../helpers/errorHandler');
const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('../config');
const { Server } = require('http');

const averify = util.promisify(jwt.verify);

const isAuth = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];

    await averify(token, config.jwtSecret).catch(() => {
        res.redirect('/');
    });
    next();
}

const isAdmin = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];

    const payload = await averify(token, config.jwtSecret).catch(() => {
        res.redirect('/');
    });

    if(!payload.isAdmin) throw new Server(401, 'Lacking permissions');

    next();
}

module.exports = { isAuth, isAdmin }