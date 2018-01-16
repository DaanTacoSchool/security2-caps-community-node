var express = require('express');
var router = express.Router();

const mongodb = require('../model/db');
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
  const id = req.param('id');
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
  postProps.user = req.user.sub;

  Post.create(postProps)
      .then((post) => {
      res.status(200).send(Post);
      })
      .catch((error) => res.status(400).json(error));
});


// Update a Post by ID
router.put('/posts/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.param('id');
  const postProps = req.body;
  postProps.user = req.user.sub;

  Post.findByIdAndUpdate({_id: id}, postProps)
    .then(() => Post.findById({_id: id}))
    .then(driver => res.send(driver))
    .catch((error) => res.status(400).json(error))
});







module.exports = router;