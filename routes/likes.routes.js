const express = require('express');
const router = express.Router();
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');

const Like = require('../model/like');

// Get likes of a post
router.get('/likes/:postId', (req, res) => {
    let postId = req.params.postId;

    Like.find({ postId: postId}).then((err, likes) => {
        if (err) return res.json(err);

        res.status(200).json(likes);
        console.log('fetched likes from post with id ' + postId);
    });
});

// Get likes of a user
router.get('/likes/u', (req, res) => {
    console.log(req.user.sub);
    // GetUserASPNETBackendv2(req.user.sub)
    //     .then((u) => {
    //         console.log(u);
    //         Like.find({ user: u})
    //             .then((likes) => {
    //                 console.log(likes);
    //                 res.status(200).json(likes);
    //             }).catch((error) => {
    //                 res.status(400).json(error);
    //             });
    //     });
    console.log('hello');
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
    Like.remove({ _id : req.params.id }, (err) => {
        if (err) return res.json(err);
        res.status(200).json({message: 'Like removed'});
    });
});

module.exports = router;