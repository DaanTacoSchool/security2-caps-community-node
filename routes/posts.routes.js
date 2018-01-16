const express = require('express');
const router = express.Router();
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');

const Post = require('../model/post');
const Comment = require('../model/comment');

// Get all Posts
router.get('/posts', function(req, res) {
  res.contentType('application/json');
  Post.find({})
    .then((Post) => {
        console.log(Post);
      res.status(200).json(Post);
    })

    .catch((error) => res.status(400).json(error)); 
});

// Get a post by ID
router.get('/posts/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.params.id;
  console.log("the id is:");
  console.log(id);
  Post.findOne({_id: id})
      .then((post) => {
          Comment.find({"_id":{ "$in": post.comments}})
            .then((comments)=> {post.comments= comments; console.log(post)
              res.status(200).json(post);

            }) // log comments -- give result ok only when in then
            .catch((error) => console.log(error));
    
        //  console.log(post);
      })
      .catch((error) => res.status(400).json(error));
});


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
            description: postProps.title,
            image_path: postProps.image_path,
            user: user
        };

        Post.findByIdAndUpdate({_id: id, 'user.guid': req.user.sub}, {$set: update}, {new: true})
            .then((post) => {
                res.status(200).json(post);
            })
            .catch((error) => res.status(400).json(error));
    }).catch((error) => {
        res.status(400).json({error: 'Could not load user'});
    });


});







module.exports = router;