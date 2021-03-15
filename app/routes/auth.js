
const { ServerError } = require('../helpers/errorHandler');
const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('../config');

const averify = util.promisify(jwt.verify);

const isAuth = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];
    
    try {
        const payload = await averify(token, config.jwtSecret);
        res.locals.payload = payload;
        return next();
    }
    catch(err) {
        return res.redirect('/');
    }
    
}

const isAdmin = async (req, res, next) => {
    const token = req.cookies['MSGardenToken'];
    const superSecret = req.header('supersecret');

    try {
        if(!config.isAuth || superSecret === config.secretMegaPassage) return next();

        const payload = await averify(token, config.jwtSecret);
        
        if(!payload.isAdmin)  return next(new ServerError(401, 'Lacking permissions'));

        res.locals.payload = payload;
        return next();
    }
    catch(err) {
        return res.redirect('/');
    }
}

module.exports = { isAuth, isAdmin }