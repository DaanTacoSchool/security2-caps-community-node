const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const CommentSchema = new Schema({
  postId: {type: mongoose.Schema.Types.ObjectId, ref: 'post'},
  content: String,
  user: User,
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;