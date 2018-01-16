const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  userId: String,
  likes: Number
});

const Like = mongoose.model('like', LikeSchema);

module.exports = Like;