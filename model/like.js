const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const PostSchema = require('./post');

const LikeSchema = new Schema({
  userId: String,
  likes: {
    type: Number
  }
});



const Like = mongoose.model('like', LikeSchema);

module.exports = Like;