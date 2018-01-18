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
    let post = req.body.post;

    Like.count({'user.guid': req.user.sub, post: post}, function(err, c){
        if(err) {
            res.status(400).json(error);
        } else {
            if(c === 0){
                GetUserASPNETBackendv2(req.user.sub)
                    .then((user) => {
                        const like = new Like();
                        like.user = user;
                        like.post = post;

                        Like.create(like)
                            .then((like) => {
                                Post.findByIdAndUpdate({_id: post}, {$push: {likes: like}})
                                    .then((post) => {
                                        res.status(200).json(like);
                                    })
                                    .catch((e) => {
                                        res.status(400).json(e);
                                    });
                            })
                            .catch((error) => {
                                res.status(400).json(e);
                            });
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        }


    });
});

// Delete (-un-like?) a like
router.delete('/likes/:id', (req, res) => {
    Like.findOneAndRemove({ _id : req.params.id,  'user.guid': req.user.sub })
        .then((like) => {
            Post.findByIdAndUpdate({_id: like.post}, {$pull: {likes: like._id}}, {new: true})
                .populate('comments')
                .populate('likes')
                .then((post) => {
                    res.status(200).json({message: 'Like removed'});
                })
                .catch((error) => {
                    res.status(400).json(error);
                });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;