
const { ServerError } = require('../helpers/errorHandler');

const isAuth = (req, res, next) => {
    // TO DO: verify token
    next();
}

const isAdmin= (req, res, next) => {
    // TO DO: verify token and that payload isAdmin
    next();
}

module.exports = { isAuth, isAdmin }