var express = require('express');
var router = express.Router();
const auth = require('../model/authorization');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  let name = req.body.name;
  let token = auth.encodeToken(name);

  auth.decodeToken(token, (payload) => {
    res.json(payload);
  });
  
});

module.exports = router;
