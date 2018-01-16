const Schema = require('mongoose').Schema;

const UserSchema = {
    id: Number,
    guid: String,
    fullName: String,
    vendorId: String,
    email: String,
    phoneNumber: String,
    password: String,
    roleIds: [Number]
};

module.exports = UserSchema;