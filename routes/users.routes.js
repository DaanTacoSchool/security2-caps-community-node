const express = require('express');
const router = express.Router();
const {GetUserASPNETBackendv2} = require('../services/aspnet-api.service');

/* GET users listing. */
router.get('/users', function(req, res) {
  res.send('respond with a resource');
});

router.get('/users/:id', function(req, res) {
  res.contentType('application/json');
  const id = req.params.id;

    GetUserASPNETBackendv2(id).then((result) => {
        const user = {
            guid: result.guid,
            fullName: result.fullName,
            email: result.email
        };
        res.json(user);
    }).catch((error)=> {
        res.status(400).json({error: 'Could not load user'});
    });

});

module.exports = router;
