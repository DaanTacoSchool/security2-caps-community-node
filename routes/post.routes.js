var express = require('express');
var router = express.Router();

const mongodb = require('../model/db');
const posts = require('../model/post');

router.get('/posts', function(req, res) {
  res.contentType('application/json');
  posts.find({})
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
