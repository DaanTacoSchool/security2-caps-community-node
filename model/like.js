const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const LikeSchema = new Schema({
  user: User,
  postId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'post'
}
});

const Like = mongoose.model('like', LikeSchema);

module.exports = Like;