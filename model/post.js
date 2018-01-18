const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const PostSchema = new Schema({
    user: User,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'like'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    title: String,
    description: String,
    image_path: String
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;