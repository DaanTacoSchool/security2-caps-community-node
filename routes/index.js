var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('user');

/* GET home page. */
router.post('/', function(req, res, next) {
  const joe = new User({ name: 'Joe' });

  joe.save()
    .then(() => {
      assert(!joe.isNew);
      res.status(201);
      res.json({"message": "success"})
    });
});

module.exports = router;
