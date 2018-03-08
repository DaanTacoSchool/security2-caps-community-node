const express = require('express');
const router = express.Router();
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');
var validator = require('validator');

/* GET users listing. */
router.get('/users', function(req, res) {
  res.send('respond with a resource');
});

router.get('/users/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.params.id;

  if(validator.isUUID(id)) {
      GetUserASPNETBackendv2(id).then((result) => {
          const user = {
              guid: result.guid,
              fullName: result.fullName,
              email: result.email
          };
          res.json(user);
      }).catch((error) => {
          //when error occurs in webshop API, or when user doesnt exist, return this error so when guids are bruteforced
          //    the attacker does not know which guids have existing users and which dont
          res.status(403).json({error: 'User not allowed'});
      });
  }else{
      // when invalid guid return forbidden error
      res.status(403).json("Invalid user identification");
  }

});

module.exports = router;
