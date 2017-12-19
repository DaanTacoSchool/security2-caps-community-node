const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var User = function (data) {
//   this.data = data;
// }

// User.prototype.date = {}

// User.findById = function(id, callback) {
//   db.get('users', {id: id}).run(function (err, data)
// if (err) return callback(err);
// callback(null, new User(data));
// });

// }

const UserSchema = new Schema({
  name: String,
  password: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = UserSchema;
