const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const CommentSchema = new Schema({
  postId: String,
  content: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});



const Comment = mongoose.model('comment', CommentSchema);
const comment =  new Comment({
    postId: '5a3a1d60969f092f7c462c12',
    content: 'test',
    user: '5a3a1d60969f092f7c462c12',
});
module.exports = Comment;