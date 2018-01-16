const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'post'
  }
});



const Like = mongoose.model('like', LikeSchema);

module.exports = Like;