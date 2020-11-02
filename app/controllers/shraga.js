
const jwt = require('jsonwebtoken');
const util = require('util');
const { ServerError } = require('../helpers/errorHandler');
const config = require('../config');
const { dbGetAllowedById } = require('../repository');

const averify = util.promisify(jwt.verify);

const checkAuth = async (req, res) => {
    //const token = req.header('Authorization');
    const token = req.cookies['MSGardenToken']

    const payload = await averify(token, config.jwtSecret).catch(() => {
        // throw new ServerError(401, 'fuck you');
        res.redirect('/shraga');
    });

    res.send(payload);
}

const shragaCallback = async (req, res) => {
    const { id , displayName } = req.user;
    const allowedUser = await dbGetAllowedById(id);
    if(!allowedUser) {
        return res.redirect('/fuckyou')
    }

    const token = jwt.sign({
        fullName: displayName,
        isAdmin: allowedUser.isAdmin
    },config.jwtSecret, { expiresIn: "1h"});

    res.cookie('MSGardenToken', token)
    res.send(token);
    
}

module.exports = { checkAuth, shragaCallback }