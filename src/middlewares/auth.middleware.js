const jwt = require('jsonwebtoken');
const config = require('../config/config');

const UnauthorizedError = require('../errors/UnauthorizedError')
const BadRequestError = require('../errors/BadRequestError')

function authJWT(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new BadRequestError("Token not found")
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded;
        req.userId = decoded.id;
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid token")
        // next(error)
    }
}

module.exports = authJWT