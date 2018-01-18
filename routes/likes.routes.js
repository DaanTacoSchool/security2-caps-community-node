const express = require('express');
const router = express.Router();
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');
const config = require('../config/config.json');
const jwt = require('express-jwt');

const Like = require('../model/like');


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
    let postId = req.body.postId;

    console.log(postId);

    GetUserASPNETBackendv2(req.user.sub)
        .then((user) => {
            let l = new Like({
                user: user,
                postId: postId
            });
            l.save().then((like) => {
                res.status(200).json(like);
            }).catch((error) => {
                res.status(400).json(error);
            })
        });
});

// Delete (-un-like?) a like
router.delete('/likes/:id', (req, res) => {
    Like.remove({ _id : req.params.id,  'user.guid': req.user.sub }, (err) => {
        if (err) return res.json(err);
        res.status(200).json({message: 'Like removed'});
    });
});

module.exports = router;