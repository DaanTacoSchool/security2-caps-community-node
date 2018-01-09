const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('user');
const Like = mongoose.model('like');
const Comment = mongoose.model('comment');

const PostSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'like'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
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
    postId: '5a3cd1183480740d58379ed4',
    content: 'test',
    user: this.user,
});

// var users = [user];
var usr = 'test';
var lke = 'test';
const post = new Post({
    title: 'Caps test',
    description: 'test!',
    made_by: 'meer',
    imagePath: 'https://www.fjallraven.nl/media/catalog/product/cache/all/base/522x/17f82f742ffe127f42dca9de82fb58b1/F/8/F89941-220_0.jpg',
    comments: [comment._id, comment._id],
    user: user._id,
    likes: [like._id]
});
// .save().then((p) => {
//     console.log(p);
        
// })
//     .catch((error) => console.log(error));
// console.log(post);

module.exports = Post;