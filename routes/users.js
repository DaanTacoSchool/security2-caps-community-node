var express = require('express');
var router = express.Router();
var User = require('../model/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.param('id');
  console.log(id);
  User.findOne({_id: id})
      .then((User) => {
          res.status(200).json(User);
      })
      .catch((error) => res.status(400).json(error));
});

module.exports = router;
