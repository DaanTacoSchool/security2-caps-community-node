const express = require('express');
const router = express.Router();
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');
const config = require('../config/config.json');
const jwt = require('express-jwt');

const Like = require('../model/like');
const Post = require('../model/post');


// Get likes of a user
router.get('/likes/u', jwt({
    secret: config.secretKey,
    credentialsRequired: true
}), (req, res) => {
    Like.find({ 'user.guid': req.user.sub})
                .populate({
                    path: 'post',
                    populate: ['likes', 'comments']
                })
                .then((likes) => {
                    console.log(likes);
                    res.status(200).json(likes);
                }).catch((error) => {
                    res.status(400).json(error);
                });
});

// Get likes of a post
router.get('/likes/:postId', (req, res) => {
    let postId = req.params.postId;

    Like.find({ post: postId})
    .populate({
        path: 'post',
        populate: ['likes', 'comments']
    })
    .then((err, likes) => {
        if (err) return res.json(err);

        res.status(200).json(likes);
        console.log('fetched likes from post with id ' + postId);
    });
});

// Create a like
router.post('/likes', (req, res) => {
    // let post = req.body.post;

    console.log(req.body.post);

    GetUserASPNETBackendv2(req.user.sub)
        .then((user) => {
            let l = new Like({
                user: user,
                post: req.body.post
            });
            console.log(user);
            l.save().then((like) => {
                console.log(like);
                Post.findOneAndUpdate({_id: req.body.post}, {$push: {likes: like}}, {new: true})
                  .populate('comments')
                  .populate('likes')
                  .then((post) => {
                    res.status(200).json(post);
                  })
                  .catch((error) => {
                    res.status(400).json(error);
                  });
            }).catch((error) => {
                res.status(400).json(error);
            })
        });
});

// Delete (-un-like?) a like
router.delete('/likes/:id', (req, res) => {
    Like.remove({ _id : req.params.id,  'user.guid': req.user.sub })
    .then((like) => {
        // console.log(like);
        Post.findOneAndUpdate({_id: like.post, likes: { "$in" : [req.params.id]} }, {$pull: {likes: req.params.id}})
        .then((post) => {
            console.log(post._id);
            res.status(200).json({message: 'Like removed'});
        })
        .catch((err) => {
            return res.json(err);
        });
        
    })
    .catch((err) => {
        return res.json(err);
    });
});

module.exports = router;