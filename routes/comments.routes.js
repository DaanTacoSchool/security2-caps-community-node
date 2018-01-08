var express = require('express');
var router = express.Router();

const mongodb = require('../model/db');
const Comment = require('../model/comment');
const Post = require('../model/post');

router.get('/comments/:postId', function(req, res) {


  res.contentType('application/json');
  const id = req.params.postId;
//   console.log(id+ ' = id' );
  Post.findOne({_id: id})
      .then((post) => {
          console.log('post');
          console.log(post);
          
          Comment.find({"_id":{ "$in": post.comments._id}})
            .then((comments)=> {post.comments= comments;  console.log('comments::'); console.log(comments);  res.status(200).json(comments); }) // log comments -- give result ok only when in then console.log('comments::'); console.log(comments);
            .catch((error) =>{ console.log(error); res.status(400).json(error); });
        })
        .catch((error) =>{ console.log(error); res.status(400).json(error); 
        });
    });
    
        

module.exports = router;