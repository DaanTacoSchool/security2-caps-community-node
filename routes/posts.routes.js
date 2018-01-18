const express = require('express');
const router = express.Router();
const config = require('../config/config.json');
const jwt = require('express-jwt');
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');

const Post = require('../model/post');

// Get all Posts
router.get('/posts', function(req, res) {
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

// Get a post by ID
router.get('/posts/:id', jwt({
        secret: config.secretKey,
        credentialsRequired: false
    }),
    function(req, res) {
        res.contentType('application/json');

        const id = req.params.id;

        Post.findOne({_id: id})
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
    }
);

// Create a post
router.post('/posts', function(req, res) {
    const postProps = req.body;

    delete postProps._id;
    delete postProps.likes;
    delete postProps.comments;

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
});


// Update a Post by ID
router.put('/posts/:id', function(req, res) {
  const id = req.params.id;
  const postProps = req.body;

    GetUserASPNETBackendv2(req.user.sub).then((user) => {
        const update = {
            title: postProps.title,
            description: postProps.description,
            image_path: postProps.image_path,
            user: user
        };

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

// Update a Post by ID
router.delete('/posts/:id', function(req, res) {
    const id = req.params.id;

    Post.findOneAndRemove({_id: id, 'user.guid': req.user.sub})
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(400).json({error: 'Could not delete post'})
        });

        router.get('/posts/u', jwt({
          secret: config.secretKey,
          credentialsRequired: true
        }), (req, res) => {
          Post.find({ 'user.guid': req.user.sub})
                      .populate({
                          path: 'post',
                          populate: ['post', 'comments']
                      })
                      .then((posts) => {
                          console.log(posts);
                          res.status(200).json(posts);
                      }).catch((error) => {
                          res.status(400).json(error);
                      });
        });

});





module.exports = router;