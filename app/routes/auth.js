
const { ServerError } = require('../helpers/errorHandler');
const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('../config');

const averify = util.promisify(jwt.verify);

const isAuth = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];

    const payload = await averify(token, config.jwtSecret).catch(() => {
        return res.redirect('/');
    });

    res.locals.payload = payload;
    return next();
}

const isAdmin = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];

    if(!config.isAuth) return next();

    const payload = await averify(token, config.jwtSecret).catch(() => {
        return res.redirect('/');
    });

    console.log(payload);
    
    if(!payload.isAdmin)  return next(new ServerError(401, 'Lacking permissions'));

    res.locals.payload = payload;
    return next();
}

module.exports = { isAuth, isAdmin }