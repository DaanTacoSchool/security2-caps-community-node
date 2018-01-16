const jwt = require('jwt-simple');
const config = require('../config/config.json');
const moment = require('moment');
const User = require('../model/user');

function encodeToken(username) {
    let payload = {
        exp: moment().add(2, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };

    return jwt.encode(payload, config.secretKey);
}

function decodeToken(token, callback) {

    try {
        let payload = jwt.decode(token, config.secretKey);

        let now = moment().unix();

        if (now > payload.exp) {
            console.log('Token expired');
        }

        User.findOne({ name: payload.sub }, (err, user) => {
            if (err) callback(err, null);

            if(!user) callback(new Error('User not found'), null);

            return callback(null, payload);
        });
    } catch (err) {
        callback(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};