var express = require('express');
var router = express.Router();

const mongodb = require('../model/db');
const Post = require('../model/post');
const Comment = require('../model/comment');

router.get('/posts', function(req, res) {
  res.contentType('application/json');
  Post.find({})
    .then((Post) => {
        console.log(Post);
      res.status(200).json(Post);
    })

    .catch((error) => res.status(400).json(error)); 
});

// router.get('/posts/:id', function(req, res) {
//   res.contentType('application/json');
//   const id = req.param('id');
//   console.log("the id is:");
//   console.log(id);
//   Post.findOne({_id: id})
//       .then((post) => {
//           Comment.find({"_id":{ "$in": post.comments}})
//             .then((comments)=> {post.comments= comments; console.log(post)
//               res.status(200).json(post);

//             }) // log comments -- give result ok only when in then
//             .catch((error) => console.log(error));
    
//         //  console.log(post);
//       })
//       .catch((error) => res.status(400).json(error));
// });


router.get('/posts/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.param('id');
  // console.log("the id is:");
  // console.log(id);
  Post.findOne({_id: id})
  .populate('comments')
      .then((post) => {
         res.send({post})
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

router.post('/posts', function(req, res) {
  const postProps = req.body;

  Post.create(postProps)
      .then((post) => {
      res.status(200).send(Post);
      })
      .catch((error) => res.status(400).json(error));
});

router.put('/posts/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.param('id');
  const postProps = req.body;

  Post.findByIdAndUpdate({_id: id}, postProps)
    .then(() => Post.findById({_id: id}))
    .then(driver => res.send(driver))
    .catch((error) => res.status(400).json(error))
});







module.exports = router;