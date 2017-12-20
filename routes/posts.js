var express = require('express');
var router = express.Router();

const mongodb = require('../model/db');
const Post = require('../model/post');

router.get('/posts', function(req, res) {
  res.contentType('application/json');
  Post.find({})
    .then((Post) => {
        console.log(Post);
      res.status(200).json(Post);
    })

    .catch((error) => res.status(400).json(error)); 
});

router.get('/posts/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.param('id');
  console.log(id);
  Post.findOne({_id: id})
      .then((Post) => {
          res.status(200).json(Post);
      })
      .catch((error) => res.status(400).json(error));
});

router.post('/posts', function(req, res) {
  const postProps = req.body;

  Post.create(postProps)
      .then((post) => {
      res.status(200).send(Post)
      })
      .catch((error) => res.status(400).json(error))
});




module.exports = router;