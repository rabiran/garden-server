
const { ServerError } = require('../helpers/errorHandler');
const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('../config');

const averify = util.promisify(jwt.verify);

const isAuth = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];

    const payload = await averify(token, config.jwtSecret).catch(() => {
        res.redirect('/shraga');
    });
    next();
}

const isAdmin = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];

    const payload = await averify(token, config.jwtSecret).catch(() => {
        res.redirect('/shraga');
    });

    if(!payload.isAdmin) res.redirect('/shraga');

    next();
}

module.exports = { isAuth, isAdmin }