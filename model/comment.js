const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const CommentSchema = new Schema({
  postId: {type: mongoose.Schema.Types.ObjectId, ref: 'post'},
  content: String,
  user: String,
});



const Comment = mongoose.model('comment', CommentSchema);
// const comment =  new Comment({
//     postId: '5a3cd1183480740d58379ed4',
//     content: 'test',
//     user: '5a3a1d60969f092f7c462c12',
// })
// .save();

module.exports = Comment;