const express = require('express');
const router = express.Router();
const config = require('../config/config.json');
const jwt = require('express-jwt');
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');
//const User = require('./model/user');
const Post = require('../model/post');
var validator = require('validator');
var mongoose = require( 'mongoose' ), id = mongoose.Types.ObjectId;


// Get all Posts
router.get('/posts', function(req, res) {

    // old git head
    /*
  res.contentType('application/json');
  Post.find({})
    .then((Post) => {
      res.status(200).json(Post);
    })
    .catch((error) => res.status(400).json(error));
});

// Get a post by ID
router.get('/posts/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.param('id');
  Post.findOne({_id: id})
      .then((post) => {
          Comment.find({"_id":{ "$in": post.comments}})
            .then((comments)=> {
              post.comments= comments;
              res.status(200).json(post);
            }) // log comments -- give result ok only when in then
            .catch((error) => console.log(error));
        //  console.log(post);
      })
      .catch((error) => res.status(400).json(error));
});

*/
    res.contentType('application/json');
    Post.find({})
        .populate('comments')
        .populate('likes')
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(400).json(error)
        });
});

router.get('/posts/u', jwt({
        secret: config.secretKey,
        credentialsRequired: true
    }), (req, res) => {
    /* check if given user uid is valid if not then throw and return error */
    try {
        if (validator.isUUID(req.user.sub)) {
            console.log("valid uuid");
            Post.find({ 'user.guid': req.user.sub})
                .populate('comments')
                .populate('likes')
                .then((posts) => {
                    res.status(200).json(posts);
                }).catch((error) => {
                console.log("the error"+ error);
                res.status(400).json(error);
            });
        }else{
            var err = new Error('invalid user guid');
            throw err
        }
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }


});

// Get a post by ID
router.get('/posts/:id', jwt({
        secret: config.secretKey,
        credentialsRequired: false
    }),
    function(req, res) {
        res.contentType('application/json');

        const pid = req.params.id;

        /* validate if post id is a valid mongodb id */
        try {
            if (id.isValid(pid)) {

                Post.findOne({_id: pid})
                    .populate('comments')
                    .populate('likes')
                    .then((post) => {
                        if (req.user !== undefined && post.user.guid === req.user.sub) {
                            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                        } else {
                            res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                        }
                        res.status(200).json(post);
                    })
                    .catch((error) => {
                        res.status(400).json(error)
                    });

            }else{
                var err = new Error('invalid post guid');throw err
            }
        }catch(err){
            console.log(err);
            res.status(400).json(err);
        }


    }
);

// Create a post
router.post('/posts', function(req, res) {
    const postProps = req.body;

    delete postProps._id;
    delete postProps.likes;
    delete postProps.comments;
    try {
        if (validator.isUUID(req.user.sub)) {

            GetUserASPNETBackendv2(req.user.sub).then((user) => {
                postProps.user = user;
                Post.create(postProps)
                    .then((post) => {
                        res.status(200).json(post);
                    })
                    .catch((error) => res.status(400).json(error));
            }).catch((error) => {
                res.status(400).json({error: 'Could not load user'});
            });

        }else{
            var err = new Error('invalid user guid'); throw err
        }
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }

});


// Update a Post by ID
router.put('/posts/:id', function(req, res) {
  const id = req.params.id;
  const postProps = req.body;

    GetUserASPNETBackendv2(req.user.sub).then((user) => {
        const update = {
            title: postProps.title,
            description: postProps.description,
            user: user
        };

        if(postProps.image_path !== undefined) {
            update.image_path = postProps.image_path;
        }

        Post.findByIdAndUpdate({_id: id, 'user.guid': req.user.sub}, {$set: update}, {new: true})
            .populate('comments')
            .populate('likes')
            .then((post) => {
                res.status(200).json(post);
            })
            .catch((error) => res.status(400).json(error));
    }).catch((error) => {
        res.status(400).json({error: 'Could not load user'});
    });

});

// delete a Post by ID
router.delete('/posts/:id', function(req, res) {
    const id = req.params.id;

    Post.findOneAndRemove({_id: id, 'user.guid': req.user.sub})
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(400).json({error: 'Could not delete post'})
        });
});





module.exports = router;