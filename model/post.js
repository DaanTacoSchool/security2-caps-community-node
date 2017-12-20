const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('user');
const Like = mongoose.model('like');
const Comment = mongoose.model('comment');

const PostSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'like'}],
    comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
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
});

const comment =  new Comment({
    postId: '5a3a1d60969f092f7c462c12',
    content: 'test',
    user: this.user,
});

var users = [user];
const post = new Post({
    title: 'Caps Sweater',
    description: 'Check out my new sweater!',
    made_by: 'Tom',
    imagePath: 'https://www.fjallraven.nl/media/catalog/product/cache/all/base/522x/17f82f742ffe127f42dca9de82fb58b1/F/8/F89941-220_0.jpg',
    comments: [comment],
    user: User,
    like: [like],
});
// .save();

module.exports = Post;