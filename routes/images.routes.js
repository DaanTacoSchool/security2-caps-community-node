var express = require('express');
var router = express.Router();

const mongodb = require('../model/db');

// Get all comments
router.post('/images', function (req, res) {
  res.contentType('application/json');
  res.status(200);
  res.send("images OK");
  // Comment.find({})
  //   .then((Comment) => {
  //     console.log(Comment);
  //     res.status(200).json(Comment);
  //   })
  //   .catch((error) => res.status(400).json(error));
});

module.exports = router;