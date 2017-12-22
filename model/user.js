const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String//,
    // required: [true, 'Name is required.'],
    // validate: {
    //   validator: (name) => name.length > 2,
    //   message: 'Name must be longer than 2 characters.'
    // }
  },
  username: String,
  city: String,
  address: String,
  postalcode: String,
  email: String,
  // posts: [PostSchema],
  // likes: Number,
  // blogPosts: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'blogPost'
  // }]
});
  
  const User = mongoose.model('user', UserSchema);
  
  
  // const user = new User ({
  //   name: 'Jeff',
  //   username: 'Jeff123',
  //   address: 'Lovensdijkstraat 63',
  //   postalcode: '4451 BH',
  //   email: 'jeff_123@gmail.com' 
  // })
  // .save();
  
  

// UserSchema.virtual('postCount').get(function () {
//   return this.posts.length;
// });
//
// UserSchema.pre('remove', function (next) {
//   const BlogPost = mongoose.model('blogPost');
//   BlogPost.remove({ _id: { $in: this.blogPosts}})
//     .then(() => next());
// });

module.exports = User;