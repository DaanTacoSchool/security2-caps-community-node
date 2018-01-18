const assert = require('assert');
const Post = require('../model/post');
const User = require('../model/user');


describe('Creating records', () => {
    it('creates a post', (done) => {
        const post = new Post({
            User: [user],
            likes: '5',
            comments: '5a3cd1183480740d58379ed4',
            made_by: 'Admin',
            title: 'Caps',
            description: 'Mooie caps shirt',
        });
        const user = new User({
            username: 'Admin',
            city: 'Breda',
            address: 'Lovensdijkstraat',
            postalcode: '5553 AB',
            email: 'avans@avans.nl'
        });

        post.save()
            .then(() => {
                // did the post save succesfully?
                assert(!post.isNew);
                done();
            });
    });
});
