const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


before((done) => {
mongoose.connect('mongodb://localhost/communitybackend_test');
mongoose.connection
  .once('open', () => { done(); })
  .on('error', (error) => {
     console.warn('Warning', error);
  });
});

beforeEach((done) => {
  mongoose.connection.collections.posts.drop(() => {
    done();
  });
});
