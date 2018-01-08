import { Collection } from 'mongoose';

var express = require('express');
var router = express.Router();

const mongodb = require('../model/db');
const Comment = require('../model/comment');
const Post = require('../model/post');

router.get('/comments', function (req, res) {
  res.contentType('application/json');
  Comment.find({})
    .then((Comment) => {
      console.log(Comment);
      res.status(200).json(Comment);
    })
    .catch((error) => res.status(400).json(error));
})


router.get('/comments/:postId', function (req, res) {

  res.contentType('application/json');
  // const id = req.params.postId;
  //   console.log(id+ ' = id' );
  const id = req.param('id');
  // console.log("the id is:");
  // console.log(id);
  Post.findOne({ _id: id })
    .populate('comments')
    .then((post) => {
      res.send({ post })
      console.log(JSON.stringify(post));
    }, (e) => {
      res.status(400).send(e);
      console.log('Unable to get clients', e);
    })
  // .then((comments)=> {post.comments= comments; console.log(post)
  //   res.status(200).json(post);

  // }) // log comments -- give result ok only when in then
  // .catch((error) => console.log(error));

  //  console.log(post);
  // })
  // .catch((error) => res.status(400).json(error));
});

router.post('/comments/:postId', function (req, res) {
  const commentProps = req.body;
  const id = req.param('id');

  Comment.create(commentProps)
    .then((comment) => {
      Post.findByIdAndUpdate({_id: id}, {$push: {comments: comment}})
        .populate('comments')
        .then((post) => {
         res.status(200).json(comment);
           console.log(JSON.stringify(post));
        }, (e) => {
          // catch 
          console.log('Unable to get clients', e);
        })
    });
})
  .catch((error) => res.status(400).json(error));



module.exports = router;