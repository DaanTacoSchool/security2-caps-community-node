var express = require('express');
var router = express.Router();

const mongodb = require('../model/db');
const Comment = require('../model/comment');
const Post = require('../model/post');


// Get all comments
router.get('/comments', function (req, res) {
  res.contentType('application/json');
  Comment.find({})
    .then((Comment) => {
      console.log(Comment);
      res.status(200).json(Comment);
    })
    .catch((error) => res.status(400).json(error));
})


// Get all comments by PostID
router.get('/comments/:postId', function (req, res) {

  res.contentType('application/json');
  const id = req.param('id');
  console.log("the id is:");
  console.log(id);
  Comment.find({ postId: id })
    .then((comments) => {
      res.status(200).json(comments);
      console.log(JSON.stringify(post));
    }, (e) => {
      res.status(400).send(e);
      console.log('Unable to get clients', e);
    })
});

// Create a comment
router.post('/comments/:postId', function (req, res) {
  const commentProps = req.body;
  commentProps.user = req.user.sub;

  const id = req.param('id');

  Comment.create(commentProps)
    .then((comment) => {
      Post.findByIdAndUpdate({_id: id, user: commentProps.user}, {$push: {comments: comment}})
        .populate('comments')
        .then((post) => {
         res.status(200).json(comment);
           console.log(JSON.stringify(post));
        }, (e) => {
          // catch 
          console.log('Unable to get clients', e);
        })
    }).catch((error) => res.status(400).json(error));

});

// Create a post
router.post('/comments/p/:id', function (req, res) {
  const commentProps = req.body;
  commentProps.user = req.user.sub;

  //const p = req.body.post;
  console.log('------------------------------body--------------');
  console.log(req.body);
  //console.log(p);


  console.log(commentProps);
  const id = req.params.id;
  let t = new Comment({ postId: commentProps.postId,
    content: commentProps.content,
    user: commentProps.user,})
  t.save(commentProps)
    .then((comment) => {
      Post.findByIdAndUpdate({_id: id},{ $push:{ comments: comment}})   
      .then((post) => {
        console.log(post);
       res.status(200).json(comment);
       
      }).catch((error) => console.log(error));
    }).catch((error) => res.status(400).json(error));

});


// Get a post by comment
router.get('/comments/post/:id', function (req, res) {
  res.contentType('application/json');
  // comment-> find post by id
  // then use post.comments to get all comment ids and proceed to find the comment with that id. add to resultset and return.
  console.log(req.params.id);
  Post.findOne({ _id: req.params.id })
      .then((post) => {
        console.log(post);
          Comment.find({ "_id": { "$in": post.comments }}).then((comments)=> { res.status(200).json(comments); })
      .catch((error)=>{console.log(error)});
       }).catch((error) => {
      console.log(error);
          res.status(400).json(error);
      });
});
 


module.exports = router;