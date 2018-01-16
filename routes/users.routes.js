const express = require('express');
const router = express.Router();
const {GetUserASPNETBackend} = require('../services/aspnet-api.service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.params.id;

  GetUserASPNETBackend(id, function(error, result) {
      if(error) {
          res.status(400).json({error: 'Could not load user'});
      } else {
          res.json(result);
      }
  });
});

module.exports = router;
