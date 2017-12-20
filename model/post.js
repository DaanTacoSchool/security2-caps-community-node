const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('user');
const Like = mongoose.model('like');

const PostSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    like: {type: mongoose.Schema.Types.ObjectId, ref: 'like'},
    made_by: String,
    title: String,
    description: {
        type: String,
    },
    imagePath: {
        type: String,
    }
    // Like: LikeSchema,
    // Comment: CommentSchema,
});

const Post = mongoose.model('post', PostSchema);

const user = new User({
    _id: '5a3a1d60969f092f7c462c12',
    name: 'Jeff'
});

const like = new Like({
    userId: 'String',
    likes: 5,
})

var users = [user];
const post = new Post({
    description: 'Check out my new sweater!',
    imagePath: 'https://www.fjallraven.nl/media/catalog/product/cache/all/base/522x/17f82f742ffe127f42dca9de82fb58b1/F/8/F89941-220_0.jpg',
    user: user,
    Like: like,
})
.save();

module.exports = Post;