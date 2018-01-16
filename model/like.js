const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const LikeSchema = new Schema({
  user: User,
  likes: Number
});

const Like = mongoose.model('like', LikeSchema);

module.exports = Like;