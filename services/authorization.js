const jwt = require('jwt-simple');
const config = require('../config/config.json');
const moment = require('moment');
const User = require('../model/user');

function encodeToken(user) {
    let payload = {
        exp: moment().add(2, 'days').unix(),
        iat: moment().unix(),
        sub: user.guid
    };

    return jwt.encode(payload, config.secretKey);
}

function decodeToken(token, callback) {

    try {
        let payload = jwt.decode(token, config.secretKey);

        let now = moment().unix();

        if (now > payload.exp) {
            console.log('Token expired');
            callback(new Error('Token expired'), null);
        }

        return callback(null, payload);
    } catch (err) {
        callback(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};