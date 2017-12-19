const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String
  },
  password: {
    type: String
  }
});

// UserSchema.virtual('postCount').get(function () {
//   return this.posts.length;
// });
//
// UserSchema.pre('remove', function (next) {
//   const BlogPost = mongoose.model('blogPost');
//   BlogPost.remove({ _id: { $in: this.blogPosts}})
//     .then(() => next());
// });

const User = mongoose.model('user', UserSchema);

// const user = new User({
//   name: 'Joe',
//   password: 'admin'
// }).save();

module.exports = User;