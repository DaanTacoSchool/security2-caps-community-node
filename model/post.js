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
    imagePath: 'http://s7d4.scene7.com/is/image/BrooksBrothers/RS00118_GREY?$bbproductimages$'
})
.save();

module.exports = PostSchema;

