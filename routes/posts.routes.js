const express = require('express');
const router = express.Router();
const config = require('../config/config.json');
const jwt = require('express-jwt');
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');

const Post = require('../model/post');

// Get all Posts
router.get('/posts', function(req, res) {
// <<<<<<< HEAD
//   res.contentType('application/json');
//   Post.find({})
//     .then((Post) => {
//       res.status(200).json(Post);
//     })
//     .catch((error) => res.status(400).json(error));
// });
//
// // Get a post by ID
// router.get('/posts/:id', function(req, res) {
//   res.contentType('application/json');
//   const id = req.param('id');
//   Post.findOne({_id: id})
//       .then((post) => {
//           Comment.find({"_id":{ "$in": post.comments}})
//             .then((comments)=> {
//               post.comments= comments;
//               res.status(200).json(post);
//             }) // log comments -- give result ok only when in then
//             .catch((error) => console.log(error));
//         //  console.log(post);
//       })
//       .catch((error) => res.status(400).json(error));
// });
//
// =======
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

router.get('/posts/u', jwt({
        secret: config.secretKey,
        credentialsRequired: true
    }), (req, res) => {
        Post.find({ 'user.guid': req.user.sub})
            .populate('comments')
            .populate('likes')
            .then((posts) => {
                res.status(200).json(posts);
            }).catch((error) => {
                res.status(400).json(error);
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
// >>>>>>> origin/develop

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
            user: user
        };

        if(postProps.image_path !== undefined) {
            update.image_path = postProps.image_path;
        }

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
});





module.exports = router;