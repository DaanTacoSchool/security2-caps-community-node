const express = require('express');
const auth = require('./auth.routes');
const User = require('../model/user');
const router = express.Router();
const {LoginASPNETBackend, RegisterASPNETBackend} = require('../services/aspnet-api.service');

router.post('/auth/login', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if( email !== undefined && password !== undefined ) {
        LoginASPNETBackend(email, password, function(error, result) {
            if(error) {
                res.status(400).json({error: 'Login not correct'});
            } else {
                let user: User = {
                    guid: result.guid,
                    fullName: result.fullName,
                    email: result.email,
                };

                let token = auth.encodeToken(user);

                res.json({token: token, user: user});
            }
        });
    } else {
        res.status(400).json({error: 'Login not correct'});
    }
});

router.post('/auth/register', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let fullName = req.body.fullName;
    let phoneNumber = req.body.phoneNumber;

    if( email !== undefined && password !== undefined && fullName !== undefined && phoneNumber !== undefined ) {
        RegisterASPNETBackend(
            { email: email, password: password, fullName: fullName, phoneNumber: phoneNumber },
            function(error, response) {
                if(error) {
                    res.status(400).json({error: 'Registration not correct'});
                } else {
                    let user: User = {
                        guid: response.guid,
                        fullName: response.fullName,
                        email: response.email,
                    };

                    let token = auth.encodeToken(user);

                    res.json({token: token, user: user});
                }
            });
    } else {
        res.status(400).json({error: 'Registration not correct'});
    }
});

module.exports = router;
