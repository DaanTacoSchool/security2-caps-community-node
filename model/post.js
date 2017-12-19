const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user.js');

const PostSchema = new Schema({
    User: UserSchema,
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

const post = new Post({
    User: {
        name: 'Jerry',
        password: 'Jerry123'
    },
    description: 'Check out my new sweater!',
    imagePath: 'https://www.fjallraven.nl/media/catalog/product/cache/all/base/522x/17f82f742ffe127f42dca9de82fb58b1/F/8/F89941-220_0.jpg'
})
// .save();

module.exports = PostSchema;
