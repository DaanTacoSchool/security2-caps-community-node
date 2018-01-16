const express = require('express');
const router = express.Router();

const Like = require('../model/like');

// Get likes of a post
router.get('/likes/:postId', (req, res) => {
    let postId = req.params.postId;

    Like.find({ post: postId}).then((err, likes) => {
        if (err) return res.json(err);

        res.status(200).json(likes);
        console.log('fetched likes from post with id ' + postId);
    });
});

// Get likes of a user
router.get('/likes/u/:userId', (req, res) => {
    let userId = req.params.userId;
    
    Like.find({ user: userId}).then((err, likes) => {
        if (err) return res.json(err);

        res.status(200).json(likes);
        console.log('fetched likes from user with id ' + userId);
    });
});


// Create a like
router.post('/likes', (req, res) => {
    let l = new Like({
        user: req.body.user,
        postId: req.body.postId
    });

    l.save().then((err, like) => {
        if (err) return res.json(err);
        res.status(201).json(like);
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