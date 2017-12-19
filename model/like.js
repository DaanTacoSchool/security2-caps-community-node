const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const PostSchema = require('./post');

const LikeSchema = new Schema({
  likes: {
    type: Number
  }
});



const Like = mongoose.model('likes', LikeSchema);

module.exports = Like;